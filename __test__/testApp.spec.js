import { getInfo } from '../src/client/js/app';

describe("Testing the app functionality", () => {
    test("Testing the getInfo() function", () => {
           expect(getInfo).toBeDefined();
        })
    }
);