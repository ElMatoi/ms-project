import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/createcomment.dto';



@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }
  

 
}
