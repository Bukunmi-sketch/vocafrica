import "mocha";
import { assert } from "chai";

describe('emptyTestForCICD()', () => {
  it("this is an empty test to ensure the CI and CD pipeline is up", async () => {
    const expected = "test";
    const actual = "test";
    assert.deepStrictEqual(actual, expected);
  });
});
