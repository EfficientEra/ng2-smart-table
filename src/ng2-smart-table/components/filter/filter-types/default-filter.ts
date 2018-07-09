import { Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Column } from '../../../lib/data-set/column';

export class DefaultFilter implements Filter, OnDestroy {

  delay: number = 300;
  changesSubscription: Subscription;
  @Input() query: string | string[];
  @Input() inputClass: string;
  @Input() column: Column;
  @Output() filter = new EventEmitter<string | string[]>();

  ngOnDestroy() {
    if (this.changesSubscription) {
      this.changesSubscription.unsubscribe();
    }
  }

  setFilter() {
    this.filter.emit(this.query);
  }
}

export interface Filter {

  delay?: number;
  changesSubscription?: Subscription;
  query: string | string[];
  inputClass: string;
  column: Column;
  filter: EventEmitter<string | string[]>;
}
