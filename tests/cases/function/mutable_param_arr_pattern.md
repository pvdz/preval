# Preval test case

# mutable_param_arr_pattern.md

> Function > Mutable param arr pattern
>
> Param names can be written to

#TODO

## Input

`````js filename=intro
function f([a]) {
  a = $(10);
  return a;
}
$(f([1]));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let [a] = tmpParamPattern;
  a = $(10);
  return a;
};
$(f([1]));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternArrRoot = tmpParamPattern;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  a = $(10);
  return a;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [1];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const arrPatternSplat = [...tmpParamPattern];
  arrPatternSplat[0];
  const SSA_a = $(10);
  return SSA_a;
};
const tmpCalleeParam$1 = [1];
const tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
