# Preval test case

# default_yes_yes_no__undefined.md

> Normalize > Pattern > Param > Arr > Obj > Ident > Default yes yes no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })]) {
  return 'bad';
}
$(f(undefined));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { x: 'fail2' };
    arrPatternStep = tmpCallCallee(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  let x = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = $('pass');
    return 'bad';
  } else {
    x = objPatternBeforeDefault;
    return 'bad';
  }
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(undefined);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { x: 'fail2' };
    arrPatternStep = $(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  const objPatternBeforeDefault = arrPatternStep.x;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    $('pass');
    return 'bad';
  } else {
    return 'bad';
  }
};
const tmpCalleeParam$1 = f(undefined);
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
