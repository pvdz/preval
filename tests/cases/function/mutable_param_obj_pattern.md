# Preval test case

# mutable_param_obj_pattern.md

> Function > Mutable param obj pattern
>
> Param names can be written to

#TODO

## Input

`````js filename=intro
function f({x: a}) {
  a = $(10);
  return a;
}
$(f({x: 1}));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let a = tmpParamPattern.x;
  a = $(10);
  return a;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  tmpParamPattern.x;
  const SSA_a = $(10);
  return SSA_a;
}
const tmpCalleeParam$1 = { x: 1 };
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

Normalized calls: Same

Final output calls: Same
