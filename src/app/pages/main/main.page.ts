
import { Component , OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { LoginRequestService } from '../../services/request/login-request.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  item: any;
  id: string;

  constructor(private aut: AngularFireAuth,
    private router: Router , public services: ServicesService,
    private login: LoginRequestService ) {
    }

  ngOnInit() {
    this.logued();
  }



  logued() {
    this.login.checkToken();
  }

  async signOut() {
    // const res = await this.aut.auth.signOut();
    // console.log(res);
    // this.router.navigateByUrl('/login');
  }

  async getProfile(id) {
    await this.services.getProfile(id).subscribe((data: any) => {
      if (data.length === 0) {
        console.log('profile empty');
        this.router.navigateByUrl(`edit-profile`);
      } else {
        console.log('Profile not empty');
        console.log(data);
        this.item = data;
      }
    });
  }


  profile() {
    this.router.navigateByUrl(`profile`);
  }
}
