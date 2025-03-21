import { describe, before, after, it } from 'node:test';
import { deepStrictEqual, strictEqual, ok } from 'node:assert';
import fetch from 'node-fetch';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

describe('Login Workflow', () => {
    let _server = {};
    before(async () => {
        const { app } = await import('../../src/api/api.js');
        _server = app;
        await new Promise(resolve => _server.once('listening', resolve));
    });

    after(done => _server.close(done));

    it('should receive not authorized given wrong user and password', async () => {
        const data = {
            user: 'viniciusstaiguer',
            password: ''
        };
        const request = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        strictEqual(request.status, 401);
        const response = await request.json();
        deepStrictEqual(response, { error: 'User invalid!' });
    });

    it('should login successfully given user and password', async () => {
        const data = {
            user: 'viniciusstaiguer',
            password: 'test'
        };
        const request = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        strictEqual(request.status, 200);
        const response = await request.json();
        ok(response.token, 'token should be present');
    });
});