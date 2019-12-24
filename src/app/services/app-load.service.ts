import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



export function appLoadFactory(appLoadService: AppLoadService) {
    return () => appLoadService.initApp();
}

@Injectable({
    providedIn: 'root'
})
export class AppLoadService {
	static appConfig: any;

	constructor(private readonly http: HttpClient) {}

	initApp() {
		const configFilePath = `assets/config/config.json`;
		return new Promise<void>((resolve, reject) => {
			this.http
				.get(configFilePath)
				.toPromise()
				.then((config: any) => {
					AppLoadService.appConfig = config;
					resolve();
				})
				.catch(error => {
					console.log(error);
					reject('Error while recovring app config');
				})
		});
	}
}