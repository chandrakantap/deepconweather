import * as urlUtils from "./urlUtils";

describe("urlUtils", () => {
  test("should parse location.search string properly", () => {
    const searchString =
      "?cityId=TOKYO_TOKYO_JAPAN&cityName=Tokyo&region=Tokyo&country=Japan";
    const result = urlUtils.getQueryParams(searchString);
    const expected = {
      cityId: "TOKYO_TOKYO_JAPAN",
      cityName: "Tokyo",
      region: "Tokyo",
      country: "Japan",
    };
    expect(result).toEqual(expected);
  });
});
