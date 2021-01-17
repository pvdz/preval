# Preval test case

# sequence-simple.md

> normalize > assignment > for-let > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
for (let wat = (a, b).c = d; false;);
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
  let wat = d;
  while (false) {}
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
while (false) {}
$(1, b, c, 3);
`````
