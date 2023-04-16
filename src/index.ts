import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { getAllRig, addRig } from './utils';

type Bindings = {
    fbrig: KVNamespace,
}

const app = new Hono<{ Bindings: Bindings }>()


app.use('*', cors({
    origin: ['http://localhost:5500','https://fb-rig.pages.dev'],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
}))
app.options('*', (c) => {
    return c.text('', 204)
})


app.post('/', async (c, next)=>{
    let data = await c.req.json();
    data.id =`${ Date.now()}`;
    let rigs = await addRig(data, c.env);
    return c.json(rigs);

});


app.get('/', async (c, next)=>{
    let rigs = await getAllRig(c.env);
    return c.json(rigs);
});



export default app
