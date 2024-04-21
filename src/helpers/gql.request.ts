/* eslint-disable react-hooks/rules-of-hooks */
import { ProductInCart } from "@/api/types";
import { gql, useMutation, useQuery } from "@apollo/client";
import { mainGqlClient } from "./gql.setup";

export const ADD_TO_CART = gql`
  mutation AddToCart(
    $identifier: ID!
    $collectionName: String!
    $name: String!
    $description: String!
    $image_url: String!
  ) {
    cartCreat(
      identifier: $identifier
      collectionName: $collectionName
      name: $name
      description: $description
      image_url: $image_url
    ) {
      identifier
      collectionName
      name
      description
      image_url
    }
  }
`;

export const GET_CART_BY_ID = gql`
  query GetCartById($identifier: ID!) {
    cartById(identifier: $identifier) {
      identifier
      collectionName
      name
      description
      image_url
    }
  }
`;

export const GET_CARTS = gql`
  query GetCarts {
    cartList {
      identifier
      name
      collectionName
      description
      image_url
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($identifier: ID!) {
    cartRemoveById(identifier: $identifier)
  }
`;

export const CLEAR_CART = gql`
  mutation ClearCart {
    cartClear
  }
`;

export const addToCart = (
  identifier: string,
  collectionName: string,
  name: string,
  description: string,
  image_url: string
) => {
  const [addItemToCart, { data, loading, error }] = useMutation(ADD_TO_CART, {
    variables: { identifier, collectionName, name, description, image_url },
    fetchPolicy: "no-cache",
  });

  return {
    addItemToCart,
    product: data?.cartCreat as ProductInCart,
    loading,
    error,
  };
};

export const getCartById = (identifier: string) => {
  const { data, loading, error, refetch } = useQuery(GET_CART_BY_ID, {
    variables: { identifier },
    fetchPolicy: "no-cache",
  });

  return {
    product: data?.cartById as ProductInCart,
    loading,
    error,
    refetch,
  };
};

export const getCarts = () => {
  const { data, loading, error, refetch } = useQuery(GET_CARTS, {
    fetchPolicy: "no-cache",
  });

  return {
    products: data?.cartList as ProductInCart[],
    loading,
    error,
    refetch,
  };
};

export const removeFromCart = (identifier: string) => {
  const [removeItemFromCart, { data, loading, error }] = useMutation(
    REMOVE_FROM_CART,
    {
      variables: { identifier },
      fetchPolicy: "no-cache",
    }
  );

  return {
    removeItemFromCart,
    result: !!data?.cartRemoveById,
    loading,
    error,
  };
};

export const clearCart = () => {
  const [clearItemsFromCart, { data, loading, error }] = useMutation(
    CLEAR_CART,
    { fetchPolicy: "no-cache" }
  );

  return {
    clearItemsFromCart,
    result: !!data?.cartClear,
    loading,
    error,
  };
};

export const addToCartAsync = (
  identifier: string,
  collectionName: string,
  name: string,
  description: string,
  image_url: string
) =>
  mainGqlClient
    .mutate({
      mutation: ADD_TO_CART,
      variables: { identifier, collectionName, name, description, image_url },
      fetchPolicy: "no-cache",
    })
    .then(({ data }) => {
      return data?.cartCreat as ProductInCart;
    });

export const clearCartAsync = () =>
  mainGqlClient
    .mutate({
      mutation: CLEAR_CART,
      fetchPolicy: "no-cache",
    })
    .then(({ data }) => {
      return !!data?.cartClear;
    });

export const removeFromCartAsync = (identifier: string) =>
  mainGqlClient
    .mutate({
      mutation: REMOVE_FROM_CART,
      variables: { identifier },
      fetchPolicy: "no-cache",
    })
    .then(({ data }) => {
      return !!data?.cartRemoveById;
    });
