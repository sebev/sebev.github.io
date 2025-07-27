export type IPublication = {
    title: string;
    authors: string[];
    year: number;
    venue: {
        name: string;
        parent: string;
        short: string;
        type: "journal" | "conference" | "workshop" | "book-chapter";
        url: string;
    };
    links: {
        type: string;
        url: string
    }[];
}