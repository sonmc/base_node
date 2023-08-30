import { Min } from 'class-validator';
export class CrudPermPresenter {
    @Min(1)
    username: string = '';
    limit: number = 0;
    page: number = 0; 
}
