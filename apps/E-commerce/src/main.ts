import { registerRemotes } from '@module-federation/enhanced/runtime';

// خريطة لربط اللينكات بالـ Ports المحلية
const LOCAL_PORTS: Record<string, number> = {
  dashboard: 4201,
};

fetch('/module-federation.manifest.json')
  .then((res) => res.json())
  .then((remotes: Record<string, string>) => {
    const isLocal = window.location.hostname === 'localhost';

    return Object.entries(remotes).map(([name, entry]) => {
      let finalEntry = entry;

      if (isLocal && LOCAL_PORTS[name]) {
        finalEntry = `http://localhost:${LOCAL_PORTS[name]}/mf-manifest.json`;
      }

      return { name, entry: finalEntry };
    });
  })
  .then((remotes) => {
    console.log('Registered Remotes:', remotes);
    return registerRemotes(remotes);
  })
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
