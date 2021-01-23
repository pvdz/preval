# Preval test case

# sequence-complex-sequence-simple.md

> normalize > assignment > stmt > sequence-complex-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
(a, $(b)).c *= (a, b).c += d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpBinaryLeft$1;
var tmpBinaryRight;
var tmpCompoundAssignLhs;
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  a;
  tmpAssignMemLhsObj = $(b);
  tmpCompoundAssignLhs = tmpAssignMemLhsObj.c;
  tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  tmpBinaryLeft = tmpCompoundAssignLhs;
  a;
  tmpNestedAssignObj = b;
  tmpBinaryLeft$1 = tmpNestedAssignObj.c;
  tmpNestedPropCompoundComplexRhs = tmpBinaryLeft$1 + d;
  tmpNestedAssignObj.c = tmpNestedPropCompoundComplexRhs;
  tmpBinaryRight = tmpNestedPropCompoundComplexRhs;
  tmpAssignMemRhs = tmpBinaryLeft * tmpBinaryRight;
  tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
  tmpAssignMemLhsObj$2.c = tmpAssignMemRhs;
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpBinaryLeft$1;
var tmpBinaryRight;
var tmpCompoundAssignLhs;
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
let b = { c: 2 };
tmpAssignMemLhsObj = $(b);
tmpCompoundAssignLhs = tmpAssignMemLhsObj.c;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpNestedAssignObj = b;
tmpBinaryLeft$1 = tmpNestedAssignObj.c;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft$1 + 3;
tmpNestedAssignObj.c = tmpNestedPropCompoundComplexRhs;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs;
tmpAssignMemRhs = tmpBinaryLeft * tmpBinaryRight;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.c = tmpAssignMemRhs;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":10}
 - 1: 1,{"c":10},"unused",3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
