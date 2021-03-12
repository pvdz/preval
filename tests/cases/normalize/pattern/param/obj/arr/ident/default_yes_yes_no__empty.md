# Preval test case

# default_yes_yes_no__empty.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['fail2']) }) {
  return 'bad';
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let $tdz$__pattern_after_default = tmpParamPattern;
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = ['fail2'];
    objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    y = 'fail';
    return 'bad';
  } else {
    y = arrPatternBeforeDefault;
    return 'bad';
  }
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = ['fail2'];
    objPatternAfterDefault = $(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const arrPatternSplat = [...objPatternAfterDefault];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    return 'bad';
  } else {
    return 'bad';
  }
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
