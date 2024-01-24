import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { findsApi, placesApi, savesApi, usersApi } from ".";

type queryFns<T> = {
  [k in keyof T]: {
    /**
     * Calling the object is a shorthand for the args passed to useQuery
     */
    (
      ...args: T[k] extends (...args: infer P) => any ? P : never[]
    ): UseQueryOptions<
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Awaited<ReturnType<T[k]>>["data"],
      AxiosError<{ statusCode: string; message: string }, any>,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Awaited<ReturnType<T[k]>>["data"],
      [string, ...(T[k] extends (...args: infer P) => any ? P : never[])]
    >;
    /**
     * Returns just the query key for the api call
     */
    queryKey: (
      ...args: T[k] extends (...args: infer P) => any ? P : never[]
    ) => [string, ...(T[k] extends (...args: infer P) => any ? P : never[])];
    /**
     * Returns just the query function for the api call
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryFn: () => Promise<Awaited<ReturnType<T[k]>>["data"]>;
    withOptions: (
      options: Omit<
        UseQueryOptions<
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          Awaited<ReturnType<T[k]>>["data"],
          AxiosError<{ statusCode: string; message: string }, any>,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          Awaited<ReturnType<T[k]>>["data"],
          [string, ...(T[k] extends (...args: infer P) => any ? P : never[])]
        >,
        "queryKey" | "queryFn"
      >
    ) => (
      ...args: T[k] extends (...args: infer P) => any ? P : never[]
    ) => UseQueryOptions<
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Awaited<ReturnType<T[k]>>["data"],
      AxiosError<{ statusCode: string; message: string }, any>,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Awaited<ReturnType<T[k]>>["data"],
      [string, ...(T[k] extends (...args: infer P) => any ? P : never[])]
    >;
  };
};

const apiToReactQuery = <T>(api: T): queryFns<T> =>
  new Proxy({} as any, {
    get: (_, name) => {
      // A function that takes the function args, and uses it to generate a unique query cache key
      const keyFn = (...args: unknown[]) => [
        `${(api as any).constructor.name}-${String(name)}`,
        ...args,
      ];

      const queryFn = async ({ queryKey: [_, ...args] }: any) =>
        // unwrap the axios response to return just the "data" property
        (await (api as any)[name](...args)).data;

      function propertyFn(...args: unknown[]) {
        // do stuff here
        return { queryKey: keyFn(...args), queryFn };
      }
      propertyFn.withOptions =
        (options: any) =>
        (...args: unknown[]) => {
          // do stuff here
          return { queryKey: keyFn(...args), queryFn, ...options };
        };
      propertyFn.queryKey = keyFn;
      propertyFn.queryFn = queryFn;

      return propertyFn;
    },
  });

export const findsQuery = apiToReactQuery(findsApi);
export const placesQuery = apiToReactQuery(placesApi);
export const usersQuery = apiToReactQuery(usersApi);
export const savesQuery = apiToReactQuery(savesApi);
