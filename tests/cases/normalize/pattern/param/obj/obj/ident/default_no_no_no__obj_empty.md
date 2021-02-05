# Preval test case

# default_no_no_no__obj_empty.md

> normalize > pattern >  > param > obj > obj > ident > default_no_no_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y } }) {
  return 'bad';
}
$(f({}, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let y = objPatternNoDefault.y;
  return 'bad';
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = {};
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  objPatternNoDefault.y;
  return 'bad';
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = {};
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
