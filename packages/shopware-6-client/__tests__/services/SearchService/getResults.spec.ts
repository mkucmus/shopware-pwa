import { getResults } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;
describe("SearchService - getResults", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should return ProductListingResult", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { apiAlias: "product_listing" },
    });
    const result = await getResults("some term");
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/v1/search?search=some term", {
      limit: 10,
      p: 1,
    });
    expect(result).toHaveProperty("apiAlias");
  });
});
