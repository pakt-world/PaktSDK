import { CreateCollectionDto, CreateManyCollectionDto } from "../../src/services/collection/collection.dto";
import PaktSDKInit from "./helper";

// how to create a new collection
const CreateCollection = async () => {
  try {
    const sdk = await PaktSDKInit();
    // test payload for login
    const collectionPayload: CreateCollectionDto = {
      name: "New collection title",
      description: "I send a New Post to Jacob",
      isPrivate: false,
      type: "job",
    };
    const collection = await sdk.collection.create(collectionPayload);
    console.log({ collection });
  } catch (error) {
    // handle error response here....
    console.log(error);
  }
};

const createCollections = async () => {
  try {
    const sdk = await PaktSDKInit();
    const collectionList: CreateCollectionDto[] = [
      {
        name: "New collection title",
        description: "I send a New Post to Jacob",
        isPrivate: false,
        type: "connection",
      },
      {
        name: "Collection Configuration",
        description: "Configure your collections with different types, mark the type in creating the collection",
        isPrivate: false,
        type: "connection",
      },
    ];
    const manyCollections: CreateManyCollectionDto = {
      type: "connection",
      parent: "job",
      collections: collectionList,
    };
    const collections = await sdk.collection.createMany(manyCollections);
    console.log({ collections });
  } catch (error) {
    // handle error response here....
    console.log(error);
  }
};

// create new collection type
// const CreateCollectionType = async () => {
//   try {
//     const sdk = await PaktSDKInit();
//     // test payload for login
//     const collectionPayload: CreateCo = {
//       name: "New collection title",
//       description: "I send a New Post to Jacob",
//       isPrivate: false,
//       type: "job"
//     };
//     const loginData = await sdk.collection.createType(collectionPayload);
//     console.log(loginData);
//   } catch (error) {
//     // handle error response here....
//     console.log(error);
//   }
// }

export { CreateCollection, createCollections };
