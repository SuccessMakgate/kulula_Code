import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker'
export class DateInputs {
    datepickerConfig :Partial<BsDatepickerConfig>;
    constructor(){
        this.datepickerConfig= Object.assign({},{
            showWeekNumbers:false,
            minDate:new Date(Date.now()),
            maxDate:new Date(2019,12,31),
            dateInputFormat: 'YYYY-MM-DD'
        });
    }
    getDateConfig(){
        return this.datepickerConfig;
    }
}
