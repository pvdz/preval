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

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let { x: a } = tmpParamPattern;
  a = $(10);
  return a;
};
$(f({ x: 1 }));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let a = bindingPatternObjRoot.x;
  a = $(10);
  return a;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = { x: 1 };
tmpCalleeParam$1.x;
const SSA_a = $(10);
$(SSA_a);
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
