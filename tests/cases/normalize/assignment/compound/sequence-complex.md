# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
(a, $(b)).c *= d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  a;
  tmpCompoundAssignObj = $(b);
  tmpCompoundAssignRhs = d;
  {
    tmpAssignMemLhsObj = tmpCompoundAssignObj;
    tmpBinaryLeft = tmpCompoundAssignObj.c;
    tmpAssignMemRhs = tmpBinaryLeft * tmpCompoundAssignRhs;
    tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let b = { c: 2 };
tmpCompoundAssignObj = $(b);
tmpCompoundAssignRhs = 3;
tmpAssignMemLhsObj = tmpCompoundAssignObj;
tmpBinaryLeft = tmpCompoundAssignObj.c;
tmpAssignMemRhs = tmpBinaryLeft * tmpCompoundAssignRhs;
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
$(1, b, c, 3);
`````

## Result

Should call `$` with:
[[{ c: 2 }], "<crash[ Cannot read property 'c' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
