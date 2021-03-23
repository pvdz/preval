# Preval test case

# exa2.md

> Normalize > Pattern > Exa2
>
> From https://babeljs.io/repl#?browsers=chrome%2080&build=&builtIns=false&spec=false&loose=true&code_lz=GYVwdgxgLglg9mAVAAgOYFMwAoCUyDeAUMsgDbpTIAeyAvMgAwDcxyAnjOqQCYGskZKAQ1x8S46nWQBGFhIC-reXOQxgyLDQCEtetLxQAFgCc4Ad2Rh0FgKLHTxrACIaAWxABnSgCN0MpzgqHFy8zISKhOSUANr4yELI8gA0yN4AulIY2IGEQA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=true&timeTravel=false&sourceType=module&lineWrap=true&presets=&prettier=false&targets=&version=7.13.7&externalPlugins=%40babel%2Fplugin-transform-destructuring%407.13.0 via https://twitter.com/NicoloRibaudo/status/1364920524355297286

#TODO

This will fail for being a generator.

## Input

`````js filename=intro
function* gen() {
  let x = 0;
  yield {
    get a() {
      x = 1;
    }
  };
  if (x !== 1) throw new Error("x must be 1");
  yield 0;
}

let [{ a }, b] = gen();
`````

## Output

`````js filename=intro
const gen = function* () {
  debugger;
  let x = 0;
  yield {
    get a() {
      debugger;
      x = 1;
    },
  };
  const tmpIfTest = x !== 1;
  if (tmpIfTest) {
    const tmpThrowArg = new Error('x must be 1');
    throw tmpThrowArg;
  } else {
    yield 0;
  }
};
const bindingPatternArrRoot = gen();
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
arrPatternStep.a;
arrPatternSplat[1];
`````

## Globals

None
