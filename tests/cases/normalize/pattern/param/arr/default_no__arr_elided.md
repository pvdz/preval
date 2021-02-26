# Preval test case

# default_no__arr_elided.md

> Normalize > Pattern > Param > Arr > Default no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([]) {
  return 'ok';
}
$(f([, , 1], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  return 'ok';
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [, , 1];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  [...tmpParamPattern];
  return 'ok';
};
const tmpCalleeParam$1 = [, , 1];
const tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
