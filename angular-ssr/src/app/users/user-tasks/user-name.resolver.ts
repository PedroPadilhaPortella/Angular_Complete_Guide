import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { UsersService } from "../users.service";

@Injectable({ providedIn: 'root' })
export class UserNameResolver implements Resolve<string> {

  constructor(private usersService: UsersService) { }

  resolve(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<string> {
    const userName = this.usersService.users.find(u => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
    return userName;
  }
}