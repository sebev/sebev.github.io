export type IPresentation = {
    title: string;
    date: string;
    venue: {
        short: string;
        parent: string;
    };
    publicationKey?: string;
};
