import {prisma} from '../../prisma/db';
import {Request, Response} from 'express'

class PostController{
    static async update(req: Request, res: Response): Promise<any> {
        const {content, id} = req.body;
  
        const post = await prisma.post.update({
          where: {id},
          data: { published: true, content },
        })
  
        res.send(post);
    }

    static async destroy(req: Request, res: Response): Promise<any> {
        var id: number = +req.params.id;

        const post = await prisma.post.delete({
            where: {id},
        })
        res.sendStatus(200);
    }

    static async create(req: Request, res: Response): Promise<any> {
        const {title, content, published, authorId} = req.body;

        const post = await prisma.post.create({
            data: {
                title,
                content,
                published,
                authorId
            }
        })
       
        res.send(post);
    }

    static async show(req: Request, res: Response): Promise<any> {
        const id: number = +req.params.id;

        const post = await prisma.post.findUnique({
            where: {id},
        })

        res.send(post);
    }
}

export default PostController;