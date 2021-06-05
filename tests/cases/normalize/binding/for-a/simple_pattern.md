# Preval test case

# simple_pattern.md

> Normalize > Binding > For-a > Simple pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
for (let a = [x, y] = z;false;) $(a, x, y, z);
`````

## Pre Normal

`````js filename=intro
let a = 1,
  x = 1,
  y = 2,
  z = [10, 20, 30];
{
  let a$1 = ([x, y] = z);
  while (false) {
    $(a$1, x, y, z);
  }
}
`````

## Normalized

`````js filename=intro
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let a$1 = undefined;
const tmpNestedAssignArrPatternRhs = z;
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
a$1 = tmpNestedAssignArrPatternRhs;
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
