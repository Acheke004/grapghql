    import express from 'express'
    import { ApolloServer } from '@apollo/server';
    import { expressMiddleware } from '@apollo/server/express4';

    async function init(){
        const app=express()
        app.use(express.json())
    const server = new ApolloServer({
        typeDefs:`
        type Query{
            hello:String
            say(name:String):String
        }
        `,//scheme
        resolvers:{
            Query:{
                hello:()=>"Hello World!",
                say:(_,{name}:{name:String})=>`hey ${name},how are you?`
            }
        }//
    });

    // Note you must call `start()` on the `ApolloServer`
    // instance before passing the instance to `expressMiddleware`
    await server.start();
// Specify the path where we'd like to mount our server
    app.use('/graphql',expressMiddleware(server));
    const PORT=Number(process.env.PORT)||8000





    app.get('/',(req,resp)=>{
        resp.json({message:"server is up and running"})
    })

    app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`))
}

init()