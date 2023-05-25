export interface IRegUserModel {
  email: string;
  password: string;
  name: string;
  banned?: boolean;
  isEmailConfirmed?: boolean;
  banReason?: string;
  regMethod?: string;
  isShowRegLink?: boolean;
  photo?: string;
  phon?: string;
}

export class RegUserModel {
  email: string;
  password: string;
  name: string;
  constructor(val: IRegUserModel) {
    this.email = val.email;
    this.password = val.password;
    this.name = val.name;
  }
}
