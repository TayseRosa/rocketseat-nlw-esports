import express,{Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json())

const prisma = new PrismaClient({
    log:['query']
})

app.get('/games',async (request:Request, response: Response) => {
    const games = await prisma.game.findMany({
        //quantidade de anuncios
        include:{
            _count:{
                select:{
                    ads: true
                }
            }
        }
    })

    return response.json(games)
})

app.post('/games/:id/ads', (request:Request, response:Response) => {
    const gameId = request.params.id
    const body = request.body

    return response.status(201).json(gameId)
})

app.get('/games/:id/ads', async (request:Request, response:Response)=>{
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select:{
            id: true,
            name: true,
            weekdays:true,
            useVoiceChannel:true,
            yearsPlaying: true,
            hoursStart: true,
            hoursEnd: true
        },
        where:{
            gameId
        },
        orderBy:{
            createdAt: 'desc'
        }
    })

    return response.json(ads.map(ad => {
        return{
            ...ad,
            weekdays: ad.weekdays.split(',')
        }
    }))
})

app.get('/ads/:id/discord', async(request: Request, response: Response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true,
        },
        where:{
            id: adId,
        }
    })

    return response.json({
        discord: ad.discord
    })
})

app.listen(3333)