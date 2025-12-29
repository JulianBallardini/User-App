import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addUser, load, removeUser, updateTotal, updateUser } from '../../store/users.actions';
import { Users } from "../users/users";
import { UserForm } from '../user-form/user-form';
import { UserModel } from '../../models/users.model';

@Component({
  selector: 'user-app',
  imports: [Users, UserForm],
  templateUrl: './user-app.html',
})
export class UserApp implements OnInit{

  title: string = 'Lista de usuarios';

  userSelected: UserModel = new UserModel();

  openForm: boolean = false;


  private store = inject(Store);
  users = this.store.selectSignal((state) => state.users.users);
  total = this.store.selectSignal((state) => state.users.total);

  ngOnInit(): void {
    this.store.dispatch(load());
    this.store.dispatch(updateTotal());
    this.openForm = false;
  }

  addUser(usuario:UserModel): void{
    if(usuario.id == -1){
      usuario.id = this.users()[this.total() -1].id + 1;
      this.store.dispatch(addUser({usuario}));
      this.store.dispatch(updateTotal());
    }else{
      this.store.dispatch(updateUser({usuario}))
    }

    this.setOpen();
  }
  
  removeUser(id: number): void{
    this.store.dispatch(removeUser({id}));
    this.store.dispatch(updateTotal());
  }

  updateUser(userRow: UserModel): void{
    this.userSelected = {... userRow};
    if(!this.openForm)this.setOpen();
  }

  setOpen(): void{
    this.openForm = !this.openForm;
    if (!this.openForm) {
      this.userSelected = new UserModel();
    }
  }


}
