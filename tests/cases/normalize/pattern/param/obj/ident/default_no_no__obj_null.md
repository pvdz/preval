# Preval test case

# default_no_no__obj_null.md

> Normalize > Pattern > Param > Obj > Ident > Default no no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x }) {
  return x;
}
$(f({ x: null }, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let $tdz$__pattern_after_default = tmpParamPattern;
  let x = $tdz$__pattern_after_default.x;
  return x;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = { x: null };
const tmpCalleeParam$2 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const x = tmpParamPattern.x;
  return x;
};
const tmpCalleeParam$1 = { x: null };
const tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
