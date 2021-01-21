# Preval test case

# sequence-simple.md

> normalize > assignment > stmt > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
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
let c = 'unused';
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
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: 1,{"c":6},"unused",3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
