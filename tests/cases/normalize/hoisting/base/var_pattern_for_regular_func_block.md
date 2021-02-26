# Preval test case

# var_pattern_for_regular_func_block.md

> Normalize > Hoisting > Base > Var pattern for regular func block
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
function f() {
  $(x);
  {
    for (var [x] = [10];false;);
  }
  $(x);
}
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  let x = undefined;
  $(x);
  const arrAssignPatternRhs = [10];
  const arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  $(x);
};
f();
`````

## Output

`````js filename=intro
const f = function () {
  $(undefined);
  const arrAssignPatternRhs = [10];
  const arrPatternSplat = [...arrAssignPatternRhs];
  const SSA_x = arrPatternSplat[0];
  $(SSA_x);
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
