import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

interface Page {
    label: number;
    active: boolean;
}

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit, OnChanges {
    @Input() totalCount = 17;
    @Input() currentPage = 1;
    @Input() dataPerPage = 5;
    @Input() pageCount = 5;

    @Output() pageChange: EventEmitter<number> = new EventEmitter();

    pages: Page[] = [];
    isFirst = false;
    isLast = true;
    isPrev = false;
    isNext = true;
    totalPage = 1;

    constructor() { }

    ngOnInit(): void {
        this.setPageNation();
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (const prop in changes) {
            if (changes.hasOwnProperty(prop)) {
                switch (prop) {
                    // totalCount값이 변경될 경우에만 update
                    case 'totalCount': {
                        this.setPageNation();
                    }
                }
            }
        }
    }

    onClickPage(page: number): void {
        this.currentPage = page;
        this.pageChange.emit(this.currentPage);
        this.setPageNation();
    }

    private setPageNation(): void {
        this.totalPage = Math.ceil(this.totalCount / this.dataPerPage);
        const pageGroup = Math.ceil(this.currentPage / this.pageCount);

        let last = pageGroup * this.pageCount;

        if (last > this.totalPage) {
            last = this.totalPage;
        }

        let first = last - (this.pageCount - 1);

        const next = last + 1;
        const prev = first - 1;

        if (this.totalPage < 1) {
            first = last;
        }

        if (1 === first) {
            this.isFirst = false;
        } else {
            this.isFirst = true;
        }

        if (this.currentPage > 1 ) {
            this.isPrev = true;
        } else {
            this.isPrev = false;
        }

        if (this.totalPage > this.currentPage) {
            this.isNext = true;
        } else {
            this.isNext = false;
        }

        if (this.totalPage === this.currentPage) {
            this.isLast = false;
        } else {
            this.isLast = true;
        }

        this.pages.length = 0;
        for (let i = first; i <= last; i++) {
            if (this.currentPage === i) {
                this.pages.push({
                    label: i,
                    active: true
                });
            } else if (i > 0) {
                this.pages.push({
                    label: i,
                    active: false
                });
            }
        }
    }

}
