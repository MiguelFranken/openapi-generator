import { Component } from '@angular/core';
import { UserListDTOExt } from './dtos/UserListDTOExt';
import { Token } from './token';
import { DeveloperEndpointsService } from "@generatedclient/api/developer-endpoints.service";
import { AuthenticationService, ResendRegistrationCodeRequestParams } from "@generatedclient/api/authentication.service";
import { CreateUserRequestParams, DownloadProfileImageRequestParams, UserService } from "@generatedclient/api/user.service";
import { FindAllActiveNewsRequestParams, NewsService } from "@generatedclient/api/news.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-client-test';

  img = null;

  constructor(
    private developerService: DeveloperEndpointsService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private newsService: NewsService) {
    // this.sendDummyLogMessage();
    // this.findAllRegistrationCodes();
    // this.getActiveNews();
    // this.findUsers();
    this.getProfileImage();
  }

  public getProfileImage() {
    const params: DownloadProfileImageRequestParams = {
      id: 1,
      thumbnail: false
    };
    this.userService.downloadProfileImage(params).subscribe(response => {
      console.log('Received image');
      this.img = response;
    });
  }

  public createUser() {
    const params: CreateUserRequestParams = {
      dto: {
        firstname: 'Migi',
        lastname: 'Test',
        email: 'a@b.com',
        username: 'dummyTestBenutzer'
      }
    };
    this.userService.createUser(params).subscribe(dto => console.log(`Created user with id ${dto.id}`));
  }

  public createNewRegistrationCode() {
    const params: ResendRegistrationCodeRequestParams = {
      dto: {
        email: 'admin@it-for-kids.org'
      }
    };
    this.authenticationService.resendRegistrationCode(params).subscribe(response => console.log('Ok'));
  }

  public authenticate() {
    this.authenticationService.useRegistrationCode({
      dto: {
        code: '2808'
      }
    }).subscribe(jwtResponseDTO => {
      Token.setToken(jwtResponseDTO);
      console.log('Successfully authenticated user');
    });
  }

  // private sendDummyLogMessage() {
  //   const dto1: LogMessageDTO = {
  //     classname: 'Some Classname',
  //     logname: 'INFO',
  //     message: 'Some Message',
  //     timestamp: '123456789'
  //   };
  //
  //   const params: LogRequestParams = {
  //     dtos: [dto1]
  //   };
  //   this.developerService.log(params).subscribe(response => {
  //     console.log('Received: ', response);
  //   });
  // }

  private findAllRegistrationCodes() {
    this.authenticationService.findAllRegistrationCodes().subscribe(dtos => {
      dtos.forEach(dto => console.log('Found Code: ' + dto.code));
    });
  }

  private findUsers() {
    this.userService.findAllUsers({
      debugging: true,
      responseType: UserListDTOExt
    }).subscribe((list) => {
      list.getSomething();
    }, () => {
      console.log('Some error occurred');
    });
  }

  private getActiveNews() {
    const params: FindAllActiveNewsRequestParams = {
    };
    this.newsService.findAllActiveNews(params).subscribe(response => console.log(response));
  }

}
