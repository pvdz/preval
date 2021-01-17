# Preval test case

# sequence-simple.md

> normalize > assignment > switch-discriminant > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
switch ((a, b).c = d) {}
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  a;
  tmpAssignMemLhsObj = b;
  tmpAssignMemRhs = d;
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  const tmpSwitchTest = d;
  {
    let tmpFallthrough = false;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let b = { c: 2 };
tmpAssignMemLhsObj = b;
tmpAssignMemRhs = 3;
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
$(1, b, c, 3);
`````
