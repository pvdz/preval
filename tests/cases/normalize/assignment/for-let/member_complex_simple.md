# Preval test case

# member_complex_simple.md

> normalize > assignment > for-let > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (let wat = $(a).x = b; false;) $(wat);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  {
    tmpAssignMemLhsObj = $(a);
    tmpAssignMemRhs = b;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  }
  let wat = b;
  while (false) {
    $(wat);
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpAssignMemRhs = 2;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
while (false) {
  $(2);
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: {"x":2},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
