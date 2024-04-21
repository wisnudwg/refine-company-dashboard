import { GraphQLFormattedError } from "graphql";

interface Error {
  message: string;
  statusCode: number;
}

const customFetch = async (url: string, options: RequestInit) => {
  const accessToken = localStorage.getItem("access_token");

  const headers = options.headers as Record<string, string>;

  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Apollo-Require-Preflight": "true",
    }
  });
};

const getGraphQLErrors = (body: Record<"errors", GraphQLFormattedError[] | undefined>): Error | null => {
  if (!body) {
    return {
      message: 'INTERNAL_SERVER_ERROR',
      statusCode: 500,
    }
  }

  if ("errors" in body) {
    const errors = body?.errors;

    const message = errors?.map((error) => error?.message)?.join("") || JSON.stringify(errors);
    const statusCode = errors?.[0]?.extensions?.statusCode as number || 500;

    return {
      message,
      statusCode,
    }
  }

  return null;
};

export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options);

  const responseClone = response.clone();
  const body = await responseClone.json();

  const error = getGraphQLErrors(body);

  if (error) {
    throw(error);
  }

  return response;
};