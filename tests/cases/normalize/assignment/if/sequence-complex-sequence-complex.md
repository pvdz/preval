# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > if > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
if ((a, $(b)).c = (a, $(b)).c = d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  a;
  tmpAssignMemLhsObj = $(b);
  a;
  tmpNestedAssignObj = $(b);
  tmpNestedAssignObj.c = d;
  tmpAssignMemRhs = d;
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpAssignMemLhsObj = $(b);
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.c = 3;
tmpAssignMemRhs = 3;
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: {"c":3}
 - 2: 1,{"c":3},"unused",3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
