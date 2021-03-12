# Preval test case

# base.md

> Normalize > Pattern > Param > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([...x]) {
  return x;
}
$(f([1, 2, 3], 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let x = arrPatternSplat.slice(0);
  return x;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [1, 2, 3];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  const x = arrPatternSplat.slice(0);
  return x;
};
const tmpCalleeParam$1 = [1, 2, 3];
const tmpCalleeParam = f(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
