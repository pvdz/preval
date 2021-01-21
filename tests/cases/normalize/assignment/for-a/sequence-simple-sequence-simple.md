# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > for-a > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
for ((a, b).c = (a, b).c = d;false;);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  {
    a;
    {
      tmpAssignMemLhsObj = b;
      a;
      tmpNestedAssignObj = b;
      tmpNestedAssignObj.c = d;
      tmpAssignMemRhs = d;
      tmpAssignMemLhsObj.c = tmpAssignMemRhs;
    }
  }
  while (false) {}
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpAssignMemLhsObj = b;
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 3;
tmpAssignMemRhs = 3;
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
while (false) {}
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same