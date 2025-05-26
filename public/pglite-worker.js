import { PGlite } from '@electric-sql/pglite';
import { worker } from '@electric-sql/pglite/worker';

worker({
  async init() {
    // The 'idb://my-pgdata' path specifies that it'll use the browser's IndexedDB 
    return new PGlite('idb://my-pgdata'); 
  },
});