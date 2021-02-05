# Preval test case

# default_no_no__obj_str.md

> normalize > pattern >  > param > obj > ident > default_no_no__obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x }) {
  return x;
}
$(f({ x: 'abc' }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let x_1 = tmpParamPattern.x;
  return x_1;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = { x: 'abc' };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let x_1 = tmpParamPattern.x;
  return x_1;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = { x: 'abc' };
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
