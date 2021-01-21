# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > stmt > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
(a, $(b)).c *= (a, $(b)).c += d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpNestedAssignObj;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft_1;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  a;
  tmpCompoundAssignObj = $(b);
  a;
  tmpNestedAssignObj = $(b);
  {
    tmpAssignMemLhsObj = tmpNestedAssignObj;
    tmpBinaryLeft = tmpNestedAssignObj.c;
    tmpAssignMemRhs = tmpBinaryLeft + d;
    tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  }
  tmpCompoundAssignRhs = d;
  {
    tmpAssignMemLhsObj_1 = tmpCompoundAssignObj;
    tmpBinaryLeft_1 = tmpCompoundAssignObj.c;
    tmpAssignMemRhs_1 = tmpBinaryLeft_1 * tmpCompoundAssignRhs;
    tmpAssignMemLhsObj_1.c = tmpAssignMemRhs_1;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpCompoundAssignObj;
var tmpCompoundAssignRhs;
var tmpNestedAssignObj;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpBinaryLeft_1;
let b = { c: 2 };
tmpCompoundAssignObj = $(b);
tmpNestedAssignObj = $(b);
tmpAssignMemLhsObj = tmpNestedAssignObj;
tmpBinaryLeft = tmpNestedAssignObj.c;
tmpAssignMemRhs = tmpBinaryLeft + 3;
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
tmpCompoundAssignRhs = 3;
tmpAssignMemLhsObj_1 = tmpCompoundAssignObj;
tmpBinaryLeft_1 = tmpCompoundAssignObj.c;
tmpAssignMemRhs_1 = tmpBinaryLeft_1 * tmpCompoundAssignRhs;
tmpAssignMemLhsObj_1.c = tmpAssignMemRhs_1;
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: {"c":2}
 - 1: <crash[ Cannot read property 'c' of undefined ]>

Normalized calls: BAD?!
[[{ c: 2 }], [{ c: 2 }], "<crash[ Cannot read property 'c' of undefined ]>"];

Final output calls: BAD!!
[[{ c: 2 }], [{ c: 2 }], "<crash[ Cannot read property 'c' of undefined ]>"];

