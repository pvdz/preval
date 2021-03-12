# Preval test case

# base.md

> Normalize > Pattern > Param > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x }) {
  return x;
}
$(f({ x: 1, b: 2, c: 3 }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let $tdz$__pattern_after_default = tmpParamPattern;
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = $tdz$__pattern_after_default;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$2 = 'x';
  let x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
  return x;
};
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpCalleeParam$4 = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$5 = 10;
const tmpCalleeParam$3 = tmpCallCallee$2(tmpCalleeParam$4, tmpCalleeParam$5);
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const tmpCalleeParam$1 = [];
  const x = objPatternRest(tmpParamPattern, tmpCalleeParam$1, 'x');
  return x;
};
const tmpCalleeParam$4 = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$3 = f(tmpCalleeParam$4, 10);
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', b: '2', c: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
