# Preval test case

# base.md

> normalize > pattern >  > param > obj > rest > base
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
function f(tmpParamPattern) {
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = tmpParamPattern;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$2 = undefined;
  let x_1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
  return x_1;
}
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpCalleeParam$4 = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$5 = 10;
const tmpCalleeParam$3 = tmpCallCallee$2(tmpCalleeParam$4, tmpCalleeParam$5);
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = tmpParamPattern;
  const tmpCalleeParam$1 = [];
  let x_1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, undefined);
  return x_1;
}
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpCalleeParam$4 = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$3 = tmpCallCallee$2(tmpCalleeParam$4, 10);
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Result

Should call `$` with:
 - 1: { x: '1', b: '2', c: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
