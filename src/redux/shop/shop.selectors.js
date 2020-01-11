import { createSelector } from "reselect";

// Matches the string value in the URL to their respective ID
// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5
// };

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// create a new selector that helps convert our collection's object to an array
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

// selectin different categories of items
// export const selectCollection = collectionUrlParam =>
//   createSelector([selectCollections], collections =>
//     collections.find(
//       collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
//     )
//   );

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  );
