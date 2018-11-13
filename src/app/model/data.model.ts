export interface DataModel {
    name: string;
    type: string;
    formula: string;
    children: [{
        name: string;
        type: string;
        formula: string;
    }];
}
