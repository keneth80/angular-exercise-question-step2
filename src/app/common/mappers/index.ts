import { formatDate } from '@angular/common';

import { UserProfileModel } from '../models/user-profile.model';
import { User } from '../backend/models/user';
import { Feed } from '../backend/models/feed';
import { FeedModel } from '../models/feed.model';
import { ReplyModel } from '../models/reply.model';
import { Reply } from '../backend/models/reply';

// angular date format에 대한 내용은 url을 참고한다.
// https://angular.io/api/common/DatePipe

export const userMapperForUserProfile = (user: User): UserProfileModel => {
    return {
        id: user.id,
        userNickName: user.nickName,
        userEmail: user.email,
        userImage: user.image,
        userName: user.name,
        userDesciption: user.desciption,
        feedCount: user.feedCount,
        passionIndex: user.passionIndex,
        createdAt: formatDate(user.created, 'YYYY년 M월 d일 (E) aa H:mm', 'ko'),
        likeFeeds: user.likeFeeds,
        tags: user.tags,
        topTags: user.topTags
    };
};

export const feedMapperForFeedModel = (feed: Feed): FeedModel => {
    return {
        id: feed.id,
        userId: feed.userId,
        userName: feed.userName,
        userNickName: feed.userNickName,
        content: feed.content,
        createdAt: formatDate(feed.created, 'YYYY년 M월 d일 (E) aa H:mm', 'ko'),
        createdAtShort: formatDate(feed.created, 'YYYY. M. d.', 'ko'),
        tags: feed.tags,
        reply: feed.reply.map((reply: Reply) => replyMapperForReplyModel(reply)) || [],
        feedImage: feed.image,
        like: feed.like
    };
};

export const replyMapperForReplyModel = (reply: Reply): ReplyModel => {
    return {
        id: reply.id,
        content: reply.content,
        userId: reply.userId,
        userNickName: reply.userNickName,
        feedId: reply.feedId,
        createdAt: formatDate(reply.created, 'YYYY년 M월 d일 (E) aa H:mm', 'ko')
    };
};
