# Preval test case

# simple_pattern.md

> Normalize > Binding > Stmt-func-top > Simple pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let  x = 1, y = 2, z = [10, 20, 30];
  let a = [x, y] = z;
  $(a, x, y, z);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let x = 1,
    y = 2,
    z = [10, 20, 30];
  let a = ([x, y] = z);
  $(a, x, y, z);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let x = 1;
  let y = 2;
  let z = [10, 20, 30];
  let a;
  const tmpNestedAssignArrPatternRhs = z;
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  a = tmpNestedAssignArrPatternRhs;
  $(a, x, y, z);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const z = [10, 20, 30];
  const arrPatternSplat = [...z];
  const SSA_x = arrPatternSplat[0];
  const SSA_y = arrPatternSplat[1];
  $(z, SSA_x, SSA_y, z);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [10, 20, 30], 10, 20, [10, 20, 30]
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
