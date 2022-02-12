import { PostPreviewDto } from "./PostPreviewDto";

export class PostsWithCount{
    posts: PostPreviewDto[]
    count: number

    constructor(posts: PostPreviewDto[], count: number){
        this.posts = posts
        this.count = count
    }

}