# Preval test case

# default_yes_no_no__obj_obj_empty_str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } }) {
  return y;
}
$(f({ x: { x: 1, y: '', z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  let y_1 = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    y_1 = $('fail');
  } else {
    y_1 = objPatternBeforeDefault;
  }
  return y_1;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = { x: 1, y: '', z: 3 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  let y_1 = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    y_1 = $('fail');
  } else {
    y_1 = objPatternBeforeDefault;
  }
  return y_1;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = { x: 1, y: '', z: 3 };
const tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
