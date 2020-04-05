import { UserListDTO } from "@generatedclient/model/user-list-dto";

export class UserListDTOExt extends UserListDTO {
  getSomething(): string {
    return this.users[0].email + 'test';
  }
}
