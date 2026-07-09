const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: '7iiji3rf',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});
client.fetch('*[_type == "featuredCollection" && defined(slug.current)][] {"slug": slug.current}')
  .then(res => console.log('SUCCESS:', res))
  .catch(err => console.error('ERROR:', err.message));
