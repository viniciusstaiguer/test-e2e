import { describe, before, after, it } from 'node:test';
import { deepStrictEqual, strictEqual } from 'node:assert';
import fetch from 'node-fetch';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

describe('Private Data Access', () => {
    let _server = {};
    let _globalToken = '';
    before(async () => {
        const { app } = await import('../../src/api/api.js');
        _server = app;
        await new Promise(resolve => _server.once('listening', resolve));

        // Login to get a valid token
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
        const response = await request.json();
        _globalToken = response.token;
    });

    after(done => _server.close(done));

    it('should not be allowed to access private data without a token', async () => {
        const request = await fetch(`${BASE_URL}/`, {
            method: 'GET',
            headers: {
                authorization: ''
            }
        });

        strictEqual(request.status, 400);
        const response = await request.json();
        deepStrictEqual(response, { error: 'Invalid token!' });
    });

    it('should be allowed to access private data with a valid token', async () => {
        const request = await fetch(`${BASE_URL}/`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${_globalToken}`
            }
        });

        strictEqual(request.status, 200);
        const response = await request.json();
        deepStrictEqual(response, { result: 'Hey Welcome!' });
    });
});