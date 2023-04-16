interface Bindings {

    fbrig: KVNamespace;
 }


const KV_KEY_ID = '9db1ea2781a14eb181622d1a9c31b844'
export async function getAllRig(env: Bindings): Promise<any[]> {
   let rigs = await env.fbrig.get(KV_KEY_ID)

   if (rigs === null) {
      return []
   }

   return JSON.parse(rigs);
}

export async function updateRig(data: any[], env: Bindings) {
   await env.fbrig.put(KV_KEY_ID, JSON.stringify(data))
}

export async function addRig(data: Object, env: Bindings) {
   let rigs = await getAllRig(env)

   rigs.push(data);

   await updateRig(rigs, env)

   return data;
}