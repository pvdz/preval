# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > stmt > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
(a, b).c *= (a, b).c += d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_1;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft_1;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  a;
  tmpCompoundAssignLhs = b.c;
  tmpAssignMemLhsObj = b;
  tmpBinaryLeft = tmpCompoundAssignLhs;
  a;
  tmpNestedAssignObj = b;
  tmpBinaryLeft_1 = tmpNestedAssignObj.c;
  tmpNestedPropCompoundComplexRhs = tmpBinaryLeft_1 + d;
  tmpNestedAssignObj.c = tmpNestedPropCompoundComplexRhs;
  tmpBinaryRight = tmpNestedPropCompoundComplexRhs;
  tmpAssignMemRhs = tmpBinaryLeft * tmpBinaryRight;
  tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
  tmpAssignMemLhsObj_1.c = tmpAssignMemRhs;
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_1;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft_1;
let b = { c: 2 };
tmpCompoundAssignLhs = b.c;
tmpAssignMemLhsObj = b;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpNestedAssignObj = b;
tmpBinaryLeft_1 = tmpNestedAssignObj.c;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft_1 + 3;
tmpNestedAssignObj.c = tmpNestedPropCompoundComplexRhs;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs;
tmpAssignMemRhs = tmpBinaryLeft * tmpBinaryRight;
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj_1.c = tmpAssignMemRhs;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: 1,{"c":10},"unused",3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
