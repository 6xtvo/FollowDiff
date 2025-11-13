export interface Entry {
    title: string;
    media_list_data: [] | undefined;
    string_list_data: { href: string; value: string; timestamp: number; }[];
}