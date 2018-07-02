import { Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Column } from '../../../lib/data-set/column';
import {FilterConf} from "../filter.conf";

export class DefaultFilter implements Filter, OnDestroy {

  delay: number = 300;
  changesSubscription: Subscription;
  @Input() query: string | Array<FilterConf>;
  @Input() inputClass: string;
  @Input() column: Column;
  @Output() filter = new EventEmitter<string | Array<FilterConf>>();

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
  query: string | Array<FilterConf>;
  inputClass: string;
  column: Column;
  filter: EventEmitter<string | Array<FilterConf>>;
}
