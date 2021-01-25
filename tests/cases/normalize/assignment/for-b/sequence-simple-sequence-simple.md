# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > for-b > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 0;
for (;(a, b).c = (a, b).c = d;);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 0;
{
  while (true) {
    a;
    tmpAssignMemLhsObj = b;
    tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    a;
    tmpNestedAssignObj = b;
    tmpNestedPropAssignRhs = d;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    tmpAssignMemRhs = tmpNestedPropAssignRhs;
    tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
    tmpAssignMemLhsObj$2.c = tmpAssignMemRhs;
    const tmpIfTest = tmpAssignMemRhs;
    if (tmpIfTest) {
    } else {
      break;
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
while (true) {
  tmpAssignMemLhsObj = b;
  tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  tmpNestedAssignObj = b;
  tmpNestedPropAssignRhs = 0;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  tmpAssignMemRhs = tmpNestedPropAssignRhs;
  tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
  tmpAssignMemLhsObj$2.c = tmpAssignMemRhs;
  const tmpIfTest = tmpAssignMemRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(1, b, 'unused', 0);
`````

## Result

Should call `$` with:
 - 0: 1,{"c":0},"unused",0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
