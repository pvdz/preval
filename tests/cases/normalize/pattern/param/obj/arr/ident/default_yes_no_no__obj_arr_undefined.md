# Preval test case

# default_yes_no_no__obj_arr_undefined.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__obj_arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'pass'] }) {
  return y;
}
$(f({ x: [undefined], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    y = 'pass';
  } else {
    y = arrPatternBeforeDefault;
  }
  return y;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = [undefined];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    y = 'pass';
  } else {
    y = arrPatternBeforeDefault;
  }
  return y;
}
const tmpCallCallee$1 = f;
const tmpObjLitVal = [undefined];
const tmpCalleeParam$1 = { x: tmpObjLitVal, a: 11, b: 12 };
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
