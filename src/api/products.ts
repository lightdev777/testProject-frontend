import { Product } from "./types";

export const getProducts = async (): Promise<Product[]> => {
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": process.env.OPENSEA_API_KEY,
    } as HeadersInit,
  };

  try {
    const response = await fetch(
      `https://api.opensea.io/api/v2/collection/${process.env.OPENSEA_COLLECTION_SLUG}/nfts?limit=50`,
      options
    );
    const data = await response.json();

    return (data?.nfts || []) as Product[];
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

export const getProductById = async (
  identifier: string
): Promise<Product | undefined> =>
  getProducts().then((products) =>
    products.find((p) => p.identifier === identifier)
  );
