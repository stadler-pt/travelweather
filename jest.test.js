import { testing } from './src/client/functionality/testing.js'

test("true", () => {
    expect(testing("fog")).toBe("https://cdn.pixabay.com/photo/2018/05/30/02/48/weather-3440560_960_720.png");
});

test.each([
    ["happy"],
    ["23"],
    [""],
    [undefined],
    [null]
    ])(".add(%s)", (string) => {
        expect(testing(string)).toBe(false);
    }   
)