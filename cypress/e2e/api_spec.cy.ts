// cypress/e2e/api_spec.cy.ts

describe('Skin Management API', () => {
    let token: string;

    it('Register User', () => {
        cy.request({
            method: 'POST',
            url: '/register',
            failOnStatusCode: false,
            body: {
                username: 'test',
                password: 'test123',
            },
        }).then((response) => {
            // If the user already exists, we consider it a success and proceed to login
            if (response.status === 409) {
                cy.log('User already exists, proceeding with existing credentials.');
            } else if (response.status === 201) {
                expect(response.body).to.have.property('token');
                token = response.body.token;
            } else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
        });
    });

    it('Login user', () => {
        cy.request('POST', '/login', {
            username: 'test',
            password: 'test123',
        }).its('body').then((body) => {
            token = body.token as string;
        });
    });

    it('Get available skins', () => {
        cy.request({
            method: 'GET',
            url: '/skins/available',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    it('Buy a skin', () => {
        cy.request({
            method: 'POST',
            url: '/skins/buy',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: {
                skinId: '1',
            },
        }).then((response) => {
            if (response.status === 409) {
                cy.log('User already owns this skin.');
            } else if (response.status === 201) {
                expect(response.body).to.be.an('object');
            } else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
        });
    });

    it('Get my skins', () => {
        cy.request({
            method: 'GET',
            url: '/skins/myskins',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    it('Change skin color', () => {
        cy.request({
            method: 'PUT',
            url: '/skins/color',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: {
                userSkinId: '1',
                newColor: 'Blue',
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
        });
    });

    it('Delete a skin', () => {
        cy.request({
            method: 'DELETE',
            url: 'skins/delete/1', // Replace 'skinId' with a valid skin ID
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Get a specific skin', () => {
        cy.request({
            method: 'GET',
            url: 'skins/getskin/2',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
        });
    });
});
