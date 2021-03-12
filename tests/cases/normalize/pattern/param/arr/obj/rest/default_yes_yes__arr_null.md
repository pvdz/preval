# Preval test case

# default_yes_yes__arr_null.md

> Normalize > Pattern > Param > Arr > Obj > Rest > Default yes yes  arr null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })] = $([{ a: 'fail2' }])) {
  return 'bad';
}
$(f([null, 20, 30], 200));
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpArrElement = { a: 'fail2' };
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
  return 'bad';
};
const tmpCallCallee$3 = $;
const tmpCallCallee$4 = f;
const tmpCalleeParam$6 = [null, 20, 30];
const tmpCalleeParam$7 = 200;
const tmpCalleeParam$5 = tmpCallCallee$4(tmpCalleeParam$6, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpArrElement = { a: 'fail2' };
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
  objPatternRest(tmpCalleeParam$2, tmpCalleeParam$3, undefined);
  return 'bad';
};
const tmpCalleeParam$6 = [null, 20, 30];
const tmpCalleeParam$5 = f(tmpCalleeParam$6, 200);
$(tmpCalleeParam$5);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
