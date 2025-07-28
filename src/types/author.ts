export type IAuthor = {
    firstName: string;
    lastName: string;
    prefix?: string;
    links: {
        type: string;
        url: string
    }[];
}