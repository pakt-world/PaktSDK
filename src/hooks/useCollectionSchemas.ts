import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateCollectionSchemaDto,
  FindCollectionSchemaDto,
  ICollectionSchemaDto,
  UpdateCollectionSchemaDto,
  filterCollectionSchemaDto,
} from "../services/collectionSchema";
import { ResponseDto } from "../utils/response";
import { getSDK, getToken } from "./factory";

/**
 * Query key factory for collection schema operations.
 * Provides centralized query key generation for consistency and reusability.
 */
export const collectionSchemaKeys = {
  all: () => ["collection-schemas"] as const,
  lists: () => [...collectionSchemaKeys.all(), "list"] as const,
  list: (filter?: filterCollectionSchemaDto) => [...collectionSchemaKeys.lists(), filter] as const,
  details: () => [...collectionSchemaKeys.all(), "detail"] as const,
  detail: (id: string) => [...collectionSchemaKeys.details(), id] as const,
};

/**
 * Factory hook for collection schema operations.
 * Returns query and mutation hooks for managing collection schemas.
 * @returns Object containing query and mutation hooks
 */
export function useCollectionSchemas() {
  const queryClient = useQueryClient();
  const token = getToken();

  if (!token) {
    throw new Error("Auth token not set. Call setAuthToken() before using hooks.");
  }

  /* -------------------- Queries -------------------- */
  const useSchemasQuery = (filter?: filterCollectionSchemaDto) =>
    useQuery({
      queryKey: collectionSchemaKeys.list(filter),
      queryFn: async (): Promise<ResponseDto<FindCollectionSchemaDto>> => {
        const sdk = getSDK();
        return await sdk.collectionSchema.getAll(token!, filter);
      },
      enabled: !!token,
    });

  const useSchemaById = (id: string) =>
    useQuery({
      queryKey: collectionSchemaKeys.detail(id),
      queryFn: async (): Promise<ResponseDto<ICollectionSchemaDto>> => {
        const sdk = getSDK();
        return await sdk.collectionSchema.getById(token!, id);
      },
      enabled: !!id && !!token,
    });

  /* -------------------- Mutations -------------------- */

  const createSchema = useMutation({
    mutationFn: async (payload: CreateCollectionSchemaDto): Promise<ResponseDto<ICollectionSchemaDto>> => {
      const sdk = getSDK();
      return await sdk.collectionSchema.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionSchemaKeys.lists(),
      });
    },
  });

  const updateSchema = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCollectionSchemaDto;
    }): Promise<ResponseDto<ICollectionSchemaDto>> => {
      const sdk = getSDK();
      return await sdk.collectionSchema.update(id, payload);
    },
    onSuccess: (_data: unknown, variables: { id: string; payload: UpdateCollectionSchemaDto }) => {
      queryClient.invalidateQueries({
        queryKey: collectionSchemaKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: collectionSchemaKeys.detail(variables.id),
      });
    },
  });

  const deleteSchema = useMutation({
    mutationFn: async (id: string): Promise<ResponseDto<object>> => {
      const sdk = getSDK();
      return await sdk.collectionSchema.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionSchemaKeys.lists(),
      });
    },
  });

  return {
    /* queries */
    useSchemasQuery,
    useSchemaById,

    /* mutations */
    createSchema,
    updateSchema,
    deleteSchema,
  };
}
