export type IPublication = {
    title: string;
    authors: string[];
    date: string;
    presented?: true;
    venue: {
        name: string;
        parent: string;
        short: string;
        type: "journal" | "conference" | "workshop" | "book-chapter";
        url: string;
        publisher?: string;
    };
    links: {
        type: string;
        url: string
    }[];
}