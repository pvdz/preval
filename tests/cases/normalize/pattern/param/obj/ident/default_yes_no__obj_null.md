# Preval test case

# default_yes_no__obj_null.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x = $('fail') }) {
  return x;
}
$(f({ x: null }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $('fail');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpObjLitVal = null;
const tmpCalleeParam$1 = { x: tmpObjLitVal };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
