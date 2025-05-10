import { sortList } from "../constants/index.js";

export const parseSortParams = ({ sortBy = 'name', sortOrder }) => {
    const parsedSortOrder = sortList.includes(sortOrder) ? sortOrder : sortList[0];

    return {
        sortBy,
        sortOrder: parsedSortOrder
    };
};