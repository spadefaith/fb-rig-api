import { Hono } from 'hono'

import { getAllRig, addRig } from './utils';

type Bindings = {
    fbrig: KVNamespace,
}

const app = new Hono<{ Bindings: Bindings }>()



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
