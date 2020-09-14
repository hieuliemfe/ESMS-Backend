import {getUsers} from '../openAPI/users-swagger'
export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'ESMS APIs Document',
        description: 'This is Swagger for ESMS APIs',
        termsOfService: '',
        contact: {
            name: 'SpacePotato',
            email: 'space.potato@gmail.com',
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    paths: {
        '/users': {
            "get": getUsers
        }
    }
}