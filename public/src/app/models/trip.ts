import {Location} from "./location";

export class Trip {
  constructor(
    public id?: string,
    public userId?: string,
    public name?: string,
    public locations?: Location[]
  ) {
  }
}
