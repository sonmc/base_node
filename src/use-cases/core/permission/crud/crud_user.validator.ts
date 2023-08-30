import { validate } from 'class-validator';
import { CrudPermPresenter } from './crud_perm.presenter';

async function permValidate(data: CrudPermPresenter) {
    const errors = await validate(data);
    if (errors.length > 0) {
        return { status: 'error', result: {} };
    }
    return { status: 'success', result: data };
}

export { permValidate };
