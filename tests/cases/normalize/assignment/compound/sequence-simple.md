# Preval test case

# sequence-simple.md

> normalize > assignment > stmt > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
(a, b).c *= d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  a;
  {
    tmpAssignMemLhsObj = b;
    tmpBinaryLeft = b.c;
    tmpAssignMemRhs = tmpBinaryLeft * d;
    tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let b = { c: 2 };
tmpAssignMemLhsObj = b;
tmpBinaryLeft = b.c;
tmpAssignMemRhs = tmpBinaryLeft * 3;
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
$(1, b, c, 3);
`````

## Result

Should call `$` with:
['<crash[ <ref> is not defined ]>'];

Normalized calls: Same

Final output calls: Same
