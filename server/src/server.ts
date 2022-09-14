import express,{Request, Response} from 'express'

const app = express()

app.get('/games', (request:Request, response: Response) => {
    return response.json([])
})

app.post('/ads', (request:Request, response:Response) => {
    return response.status(201).json([])
})

app.get('/games/:id/ads', (request:Request, response:Response)=>{
    const gameId = request.params.id;

    return response.send(gameId)

    // return response.json([
    //     {id:1, name: 'anuncio1'},
    //     {id:2, name: 'anuncio2'},
    //     {id:3, name: 'anuncio3'},
    //     {id:4, name: 'anuncio4'},
    // ])
})

app.get('/ads/:id/discord', (request:Request, response:Response)=>{
    const adId = request.params.id;

    return response.send(adId)

    return response.json([])
})

app.listen(3333)