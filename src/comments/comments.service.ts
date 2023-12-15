import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/createcomment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ){}

  create(createCommentDto: CreateCommentDto) {
    return this.commentRepository.save(createCommentDto);
  }

  async findCommentsByTaskId(taskId: number): Promise<Comment[] | null> {
    try {
      const comments = await this.commentRepository.find({
        where: { task: { id: taskId } },
      });

      return comments || [];
    } catch (error) {
      console.error('Error al buscar comentarios por tarea:', error);
      return null;
    }
  }
  async updateCommentByTaskId(taskId: number, editComment: string): Promise<UpdateResult | null> {
    try {
      const result = await this.commentRepository.update(
        { task: { id: taskId } },
        { comment: editComment }
      );

      return result;
    } catch (error) {
      console.error('Error al actualizar comentario de la tarea:', error);
      return null;
    }
  }
  
}
