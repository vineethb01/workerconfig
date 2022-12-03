/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

async function handleRequest(request) {
  const CLIENT_IP = request.headers.get('CF-Connecting-IP');
  const ASN = request.cf.asn;
  const COUNTRY = request.cf.country;
  
  if (COUNTRY === 'SG')
    return new Response("This is your IP " + CLIENT_IP + " and you are accessing this site from " + COUNTRY + " | " + ASN + "\n");

  
  return Response.redirect('https://1.1.1.1');

}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
