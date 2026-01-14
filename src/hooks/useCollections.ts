import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateCollectionStoreDto,
  FindCollectionStoreDto,
  ICollectionStoreDto,
  UpdateCollectionStoreDto,
  filterCollectionStoreDto,
} from "../services/collectionStore";
import { ResponseDto } from "../utils/response";
import { getSDK, getToken } from "./factory";

/**
 * Query key factory for collection store operations.
 * Provides centralized query key generation for consistency and reusability.
 */
export const collectionKeys = {
  all: (schemaReference: string) => ["collections", schemaReference] as const,
  lists: (schemaReference: string) => [...collectionKeys.all(schemaReference), "list"] as const,
  list: (schemaReference: string, filter?: filterCollectionStoreDto) =>
    [...collectionKeys.lists(schemaReference), filter] as const,
  details: (schemaReference: string) => [...collectionKeys.all(schemaReference), "detail"] as const,
  detail: (schemaReference: string, id: string) => [...collectionKeys.details(schemaReference), id] as const,
  count: (schemaReference: string) => [...collectionKeys.all(schemaReference), "count"] as const,
};

/**
 * Factory hook for collection store operations.
 * Returns query and mutation hooks for managing collection store items.
 * @param schemaReference - The schema reference identifier
 * @returns Object containing query and mutation hooks
 */
export function useCollections(schemaReference: string) {
  const queryClient = useQueryClient();
  const token = getToken();

  if (!token) {
    throw new Error("Auth token not set. Call setAuthToken() before using hooks.");
  }

  /* -------------------- Queries -------------------- */
  const useCollectionsQuery = (filter?: filterCollectionStoreDto) =>
    useQuery({
      queryKey: collectionKeys.list(schemaReference, filter),
      queryFn: async (): Promise<ResponseDto<FindCollectionStoreDto>> => {
        const sdk = getSDK();
        return await sdk.collectionStore.getAll({
          authToken: token!,
          schemaReference,
          filter,
        });
      },
      enabled: !!schemaReference && !!token,
    });

  const getCountQuery = useQuery({
    queryKey: collectionKeys.count(schemaReference),
    queryFn: async (): Promise<ResponseDto<number>> => {
      const sdk = getSDK();
      return await sdk.collectionStore.getCount({
        authToken: token!,
        schemaReference,
      });
    },
    enabled: !!schemaReference && !!token,
  });

  const useCollectionById = (id: string) =>
    useQuery({
      queryKey: collectionKeys.detail(schemaReference, id),
      queryFn: async (): Promise<ResponseDto<ICollectionStoreDto>> => {
        const sdk = getSDK();
        return await sdk.collectionStore.getById({
          authToken: token!,
          schemaReference,
          id,
        });
      },
      enabled: !!schemaReference && !!id && !!token,
    });

  /* -------------------- Mutations -------------------- */

  const createCollection = useMutation({
    mutationFn: async (payload: CreateCollectionStoreDto): Promise<ResponseDto<ICollectionStoreDto>> => {
      const sdk = getSDK();
      return await sdk.collectionStore.create({
        authToken: token!,
        schemaReference,
        payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.lists(schemaReference),
      });
      queryClient.invalidateQueries({
        queryKey: collectionKeys.count(schemaReference),
      });
    },
  });

  const updateCollection = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCollectionStoreDto;
    }): Promise<ResponseDto<ICollectionStoreDto>> => {
      const sdk = getSDK();
      return await sdk.collectionStore.update({
        authToken: token!,
        schemaReference,
        id,
        payload,
      });
    },
    onSuccess: (_data: unknown, variables: { id: string; payload: UpdateCollectionStoreDto }) => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.lists(schemaReference),
      });
      queryClient.invalidateQueries({
        queryKey: collectionKeys.detail(schemaReference, variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: collectionKeys.count(schemaReference),
      });
    },
  });

  const deleteCollection = useMutation({
    mutationFn: async (id: string): Promise<ResponseDto<object>> => {
      const sdk = getSDK();
      return await sdk.collectionStore.delete({
        authToken: token!,
        schemaReference,
        id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.lists(schemaReference),
      });
      queryClient.invalidateQueries({
        queryKey: collectionKeys.count(schemaReference),
      });
    },
  });

  return {
    /* queries */
    getCountQuery,
    useCollectionsQuery,
    useCollectionById,

    /* mutations */
    createCollection,
    updateCollection,
    deleteCollection,
  };
}
