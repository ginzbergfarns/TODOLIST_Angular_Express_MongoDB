
export class User {
  userEmail: string;
  userPassword: string;
  userName: string;
  userSurname: string;
  id: string;
  constructor(email, password, name, surname, id?) {
    this.userEmail = email;
    this.userPassword = password;
    this.userName = name;
    this.userSurname = surname;
    this.id = id || null;
  }
}
