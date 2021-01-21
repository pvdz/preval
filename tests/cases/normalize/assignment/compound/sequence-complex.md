# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
(a, $(b)).c *= d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  a;
  tmpAssignMemLhsObj = $(b);
  tmpCompoundAssignLhs = tmpAssignMemLhsObj.c;
  tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
  tmpAssignMemRhs = tmpCompoundAssignLhs * d;
  tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
  tmpAssignMemLhsObj_2.c = tmpAssignMemRhs;
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
let b = { c: 2 };
tmpAssignMemLhsObj = $(b);
tmpCompoundAssignLhs = tmpAssignMemLhsObj.c;
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpAssignMemRhs = tmpCompoundAssignLhs * 3;
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj_2.c = tmpAssignMemRhs;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":6}
 - 1: 1,{"c":6},"unused",3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
