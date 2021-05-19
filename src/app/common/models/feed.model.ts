export interface FeedModel {
    id: number;
    userId: number;
    userNickName: string;
    userName: string;
    content: string;
    createdAt: string;
    createdAtShort: string;
    tags: string;
    reply: any[];
    feedImage: string;
    like: number;
}
