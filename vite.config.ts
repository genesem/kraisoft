
import { terser } from 'rollup-plugin-terser';
import { resolve } from 'node:path'

const inputDir = process.env.INPUTDIR || "./src/";
const outDir = process.env.OUTDIR || "./dist/";

const assetsDir = 'inc'; // default is 'assets'
const outMaps = (process.env.OUTMAPS=='true') || false;  // otherwise false considered as string

const workMode = process.env.NODE_ENV || "development";

const production = !process.env.PROD;
console.log("vite production is:", production);
                      
console.log("inputDir", inputDir);
console.log("outDir", outDir);
console.log("outMaps", outMaps);
console.log("NODE_ENV", workMode);

export default {
  root: '.',
  mode: workMode,
  publicDir: "public",  // defaults to <root>/public, path relative to project root.
  clearScreen: false, // This is to show Eleventy output in the console along with Vite output

  // plugins: [],

  resolve: {
    alias: { 
    	'@/': resolve(__dirname, './src/') 
    }
  },
  
  build: {

    outDir: outDir,
    assetsDir:  assetsDir, // default is 'assets'
    sourcemap: outMaps,

    manifest: false, // default: true
	reportCompressedSize: false, // speed up
	//chunkSizeWarningLimit: 600,  // default 500

    rollupOptions: {
	  // input: inputDir + "main.ts",

	  plugins: [

				production && terser({
						format: {
      						comments: false
				 		},

    			}),
	  ],

    },
  },

  server: {

    // host: '127.0.0.1',  // default '127.0.0.1'
    port: 3000,        // default 3000
    strictPort: true,  // don't try to use another avail. port
  	cors: {
		"origin": "*",
		"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
		"preflightContinue": false,
	    "optionsSuccessStatus": 204
  	},

  }

}