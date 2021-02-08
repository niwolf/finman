import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, from, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { parse, ParseConfig, ParseResult } from 'papaparse';
import { Item, Origin } from '../models/item.interface';
import { ItemService } from './item.service';
import { AuthService } from './auth.service';
import * as md5 from 'md5';
import { ImportPreviewDialogComponent } from '../../dialogs/import-preview-dialog/import-preview-dialog.component';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
    providedIn: 'root'
})
export class CsvImportService {
    constructor(
        private itemService: ItemService,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    public import(file: File) {
        const config: ParseConfig = {
            complete: (results) => this.handleParseResult(results),
            // Add your options here
            worker: true
        };
        parse(file, config);
    }

    private handleParseResult(result: ParseResult<any>): void {
        const items = this.parseSparkasseExport(result);

        const uid: string = this.authService.currentUser.uid;
        this.getExistingItems(uid, items)
            .pipe(
                map((existingItems) => {
                    if (existingItems.length > 0) {
                        return items.filter(
                            (item) => !existingItems.some((existingItem) => existingItem.importId === item.importId)
                        );
                    }
                    return items;
                }),
                tap((itemsToImport) => {
                    if (itemsToImport.length === 0) {
                        this.snackBar.open('Nichts zu importieren', 'OK');
                    }
                }),
                filter((itemsToImport) => itemsToImport.length > 0),
                switchMap((itemsToImport) => {
                    const dialogRef = this.dialog.open(ImportPreviewDialogComponent, { data: itemsToImport });
                    return dialogRef.afterClosed();
                }),
                filter((itemsToImport) => itemsToImport && itemsToImport.length > 0), // catch cancel click or no selected elements
                switchMap((itemsToImport) => {
                    return combineLatest(itemsToImport.map((item) => from(this.itemService.addItem(uid, item))));
                }),
                tap((results: any[]) =>
                    this.snackBar.open(
                        `${results.length} ${results.length > 1 ? 'Einträge' : 'Eintrag'} erfolgreich importiert.`,
                        '',
                        { duration: 2000 }
                    )
                )
            )
            .subscribe();
    }

    private parseSparkasseExport(result: ParseResult<any>): Item[] {
        const header: string[] = result.data.shift();
        const receiverIndex: number = header.indexOf('Beguenstigter/Zahlungspflichtiger');
        const valueIndex: number = header.indexOf('Betrag');
        const dateIndex: number = header.indexOf('Valutadatum');

        return result.data.slice(0, result.data.length - 1).map((entry: string[]) => {
            const pattern = /(\d{2})\.(\d{2})\.(\d{2})/;
            const dateStr: string = entry[dateIndex];
            const matches = pattern.exec(dateStr);
            const date: Date = new Date(+matches[3], +matches[2], +matches[1]);
            const timestamp: Timestamp = Timestamp.fromDate(date);
            return {
                importId: md5(entry.toString()),
                title: entry[receiverIndex],
                value: parseFloat(entry[valueIndex].replace(',', '.')),
                date: timestamp,
                origin: Origin.account
            };
        });
    }

    private getExistingItems(userId: string, items: Item[]): Observable<Item[]> {
        const queryFn: QueryFn = this.createExistingItemQuery(items);

        return this.itemService.getItems(userId, queryFn).pipe(
            take(1),
            map((existingItems) => existingItems.filter((item) => !!item.importId))
        );
    }

    private createExistingItemQuery(items: Item[]) {
        const now: number = Timestamp.now().toMillis();
        const startDate: number = items.reduce((min: number, cur: Item) => Math.min(min, cur.date.toMillis()), now);
        const endDate: number = items.reduce((max: number, cur: Item) => Math.max(max, cur.date.toMillis()), startDate);

        return (ref) => {
            return ref
                .where('date', '>=', Timestamp.fromMillis(startDate))
                .where('date', '<=', Timestamp.fromMillis(endDate));
        };
    }
}
