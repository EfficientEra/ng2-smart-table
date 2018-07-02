import { Output, EventEmitter, Input } from '@angular/core';

import {Column} from "../../lib/data-set/column";
import {DataSource} from "../../lib/data-source/data-source";
import {FilterConf} from "./filter.conf";

export class FilterDefault {

  @Input() column: Column;
  @Input() source: DataSource;
  @Input() inputClass: string = '';

  @Output() filter = new EventEmitter<any>();

  onFilter(event: string | Array<FilterConf>) {
    if (typeof event === 'string') {
      this.source.addFilter({
        field: this.column.id,
        search: event,
        filter: this.column.getFilterFunction()
      });
    } else {
      for (let filter of event) {
        this.source.addFilter({
          field: filter['field'],
          search: filter['search'],
          filter: this.column.getFilterFunction()
        })
      }
    }
  }
}
