import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import gzip from 'rollup-plugin-gzip';
// import execute from 'rollup-plugin-execute';
import { exec } from 'child_process';

const optiprismSnippet = () => {
    return {
        name: 'optiprism-snippet',
        options: (opt) => {
            return new Promise((resolve) => {
                opt.input = 'generated/optiprismSnippet.js';
                if (process.env.GENERATE_SNIPPET !== 'true') return resolve(opt);
                exec('node scripts/version/createSnippet.js', (err) => {
                    if (err) {
                        throw err;
                    }
                    resolve(opt);
                });
            });
        },
    };
};

const umd = [
    {
        input: 'src/index.ts',
        output: {
            name: 'optiprism',
            file: 'public/lib/scripts/optiprism-min.umd.js',
            format: 'umd',
        },
        plugins: [
            typescript({
                module: 'es6',
                noEmit: false,
                outDir: 'lib/umd',
                rootDir: 'src',
            }),
            resolve({
                browser: true,
            }),
            commonjs(),
            terser(),
            gzip(),
        ],
    },
];

const iife = [
  {
    input: 'src/snippet-index.ts',
    output: {
      name: 'optiprism',
      file: 'lib/scripts/optiprism-min.js',
      format: 'iife',
    },
    plugins: [
      typescript({
        module: 'es6',
        noEmit: false,
        outDir: 'lib/script',
        rootDir: 'src',
      }),
      resolve({
        browser: true,
      }),
      commonjs(),
      terser(),
      gzip(),
    ],
  },
];

const snippet = [
    {
        output: {
            name: 'optiprism',
            file: 'lib/scripts/optiprism-snippet-min.js',
            format: 'iife',
        },
        plugins: [
            optiprismSnippet(),
            terser(),
            //   execute('node scripts/version/create-snippet-instructions.js'),
            //   execute('node scripts/version/update-readme.js'),
        ],
    },
];

// export default [...umd, ...iife, ...snippet];
export default [...umd];
