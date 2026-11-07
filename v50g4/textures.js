// v50g4-2. No renderer or loader behavior changes outside LOW/very-low.
// Tab v50g4 port:
//  * the WebP fallback fills the caller's texture exactly like stock TextureLoader (texture.image = image), so a
//    texture cloned before it loaded still shares the image;
//  * a KTX2 result keeps isCompressedTexture on clones too (Texture.copy does not carry that flag);
//  * callers that copy only `.image` out of the loaded texture (landmarks PMQ) cannot carry compressed mip data —
//    that was the texSubImage2D failure; st.imageOnly counts lookups of `.image` on a compressed result.
export function installTierTextures(THREE, KTX2Loader, getPreset, getRenderer) {
  const q = new URLSearchParams(location.search), original = THREE.TextureLoader.prototype.load;
  const enabled = () => q.get('v50g4') !== '0' && q.get('v50g4t') !== '0' && ['low', 'vlow'].includes(getPreset());
  const st = { compressed: 0, fallback: 0, manifestErrors: 0, imageOnly: 0 }; window.__g4Textures = st;
  let manifest, loader;
  const entries = () => manifest || (manifest = fetch('v50g4/textures-manifest.json').then(r => { if (!r.ok) throw Error(r.status); return r.json(); }).then(m => m.assets || {}).catch(() => { st.manifestErrors++; return {}; }));
  const keepFlag = t => { t.clone = function () { const c = THREE.Texture.prototype.clone.call(this); c.isCompressedTexture = true; keepFlag(c); return c; }; };
  THREE.TextureLoader.prototype.load = function (url, onLoad, onProgress, onError) {
    if (!enabled() || !/^(?:\.\/)?(?:city|village\/v4|landmarks)\/.+\.webp$/.test(url)) return original.call(this, url, onLoad, onProgress, onError);
    const self = this, preset = getPreset(), target = new THREE.Texture();
    // Keep the synchronous TextureLoader contract: callers set wrapping/color space now.
    const fillImage = src => { target.image = src.image; target.needsUpdate = true; if (onLoad) onLoad(target); };
    const fillKtx = src => {
      target.source = src.source; target.mipmaps = src.mipmaps; target.format = src.format;
      target.type = src.type; target.internalFormat = src.internalFormat;
      target.isCompressedTexture = true; keepFlag(target);
      target.generateMipmaps = src.generateMipmaps; target.flipY = false;
      target.userData.g4ktx = url;
      target.needsUpdate = true; if (onLoad) onLoad(target);
    };
    const fallback = () => { st.fallback++; original.call(self, url, fillImage, onProgress, onError); };
    entries().then(assets => {
      const asset = assets[String(url).replace(/^\.\//, '')]?.[preset];
      if (!asset || !enabled() || getPreset() !== preset) return fallback();
      try {
        loader ||= new KTX2Loader().setTranscoderPath('vendor/three170/examples/jsm/libs/basis/').setWorkerLimit(1).detectSupport(getRenderer());
        loader.load(asset, texture => { st.compressed++; fillKtx(texture); }, onProgress, fallback);
      } catch { fallback(); }
    });
    return target;
  };
}
