# Preval test case

# default_yes_yes__empty.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })] = $([{ a: 'pass2' }])) {
  return x;
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpArrElement = { a: 'pass2' };
    const tmpCalleeParam = [tmpArrElement];
    bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = $tdz$__pattern;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { a: 'fail' };
    arrPatternStep = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const tmpCallCallee$2 = objPatternRest;
  const tmpCalleeParam$2 = arrPatternStep;
  const tmpCalleeParam$3 = [];
  const tmpCalleeParam$4 = undefined;
  let x = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3, tmpCalleeParam$4);
  return x;
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$5 = f();
tmpCallCallee$3(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpArrElement = { a: 'pass2' };
    const tmpCalleeParam = [tmpArrElement];
    bindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = $tdz$__pattern;
  }
  const arrPatternSplat = [...bindingPatternArrRoot];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = { a: 'fail' };
    arrPatternStep = $(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const tmpCalleeParam$2 = arrPatternStep;
  const tmpCalleeParam$3 = [];
  const x = objPatternRest(tmpCalleeParam$2, tmpCalleeParam$3, undefined);
  return x;
};
const tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [{ a: '"pass2"' }]
 - 2: { a: '"pass2"' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
