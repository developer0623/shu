import Env from '../services/env';

export default {
    api_server: Env.load('API_SERVER', 'https://server.com/api/'),

    api_url: {
        // AUTH
        auth: {
            login: 'login',
            register: 'register'
        },

        // CARRIAGE
        carriage: {
            show: {
                detail: 'carriage/show/detail',
                active: 'carriage/show/active',
                my: 'carriage/show/my'
            },
            add: 'carriage/add',
            assign: 'carriage/add/driver',
            deleteDriver: 'carriage/driver/delete/',
            done: 'carriage/done/'
        },

        // USER
        user: {
            drivers: 'user/drivers',
            carriage: {
                accept: 'user/carriage/accept'
            }
        },

        //
        driver: 'carriage/driver/'
    }
}