import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import { exec } from 'child_process'

const optiprismSnippet = () => {
  return {
    name: 'optiprism-snippet',
    options: (opt: unknown) => {
      return new Promise(resolve => {
        // @ts-ignore
        opt.input = 'generated/optiprismSnippet.js'
        if (process.env.GENERATE_SNIPPET !== 'true') return resolve(opt)
        exec('node scripts/version/createSnippet.js', err => {
          if (err) {
            throw err
          }
          resolve(opt)
        })
      })
    },
  }
}

const umd = [
  {
    input: 'src/index.ts',
    output: {
      name: 'optiprism',
      file: 'public/lib/scripts/optiprism-min.umd.js',
      format: 'umd',
    },
    plugins: [
      typescript(),
      resolve({
        browser: true,
      }),
      terser(),
    ],
  },
]

const iife = [
  {
    input: 'src/snippet-index.ts',
    output: {
      name: 'optiprism',
      file: 'lib/scripts/optiprism-min.js',
      format: 'iife',
    },
    plugins: [
      typescript(),
      resolve({
        browser: true,
      }),
      terser(),
    ],
  },
]

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
]

// export default [...umd, ...iife, ...snippet];
export default [...umd]
