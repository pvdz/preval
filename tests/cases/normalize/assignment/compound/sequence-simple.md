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
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpCompoundAssignLhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  a;
  tmpCompoundAssignLhs = b.c;
  tmpAssignMemLhsObj = b;
  tmpAssignMemRhs = tmpCompoundAssignLhs * d;
  tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpCompoundAssignLhs;
let b = { c: 2 };
tmpCompoundAssignLhs = b.c;
tmpAssignMemLhsObj = b;
tmpAssignMemRhs = tmpCompoundAssignLhs * 3;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: 1,{"c":6},"unused",3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
