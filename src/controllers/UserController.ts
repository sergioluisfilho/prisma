import {prisma} from '../../prisma/db';
import {Request, Response} from 'express'

type ProfileInterface = {
  create: {
    bio: string;
  };
}

type PostInterface = {
  create: {
    title: string;
    content: string;
    published: boolean;
  }
}

type UserInterface = {
  name: string;
  email: string,
  profile: ProfileInterface;
  posts: PostInterface

}

class UserController{

  static async show(req: Request, res: Response): Promise<any> {
    var id: number = +req.params.id;
    const user = await prisma.user.findUnique({
      where: {id},
        include: {
            posts: true,
            profile: true,
        },
    })
    return res.send(user);

    }
    static async index(req: Request, res: Response): Promise<any> {
        const allUsers = await prisma.user.findMany({
            include: {
                posts: true,
                profile: true,
            },
        })
        return res.send(allUsers);
    }

    static async create(req: Request, res: Response): Promise<any> {
        const {name, email, title, bio, content, published} = req.body;

        const User: UserInterface = {
          name,
          email,
          posts: {
            create: {title, content, published},
          },
          profile: {
            create: {bio},
          },
        } 

        await prisma.user.create({
            data: User,
          })

        return res.sendStatus(201);
    }
}

export default UserController
