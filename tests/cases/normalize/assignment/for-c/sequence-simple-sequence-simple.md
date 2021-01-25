# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > for-c > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
let n = 1;
for (;n-->0;  (a, b).c = (a, b).c = d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpPostfixArg;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
let n = 1;
{
  while (true) {
    tmpPostfixArg = n;
    n = n - 1;
    tmpBinaryLeft = tmpPostfixArg;
    const tmpIfTest = tmpBinaryLeft > 0;
    if (tmpIfTest) {
      {
        a;
        tmpAssignMemLhsObj = b;
        a;
        tmpNestedAssignObj = b;
        tmpNestedPropAssignRhs = d;
        tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
        tmpAssignMemRhs = tmpNestedPropAssignRhs;
        tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
        tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
      }
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
var tmpAssignMemRhs;
var tmpBinaryLeft;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpPostfixArg;
let b = { c: 2 };
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = tmpPostfixArg;
  const tmpIfTest = tmpBinaryLeft > 0;
  if (tmpIfTest) {
    tmpAssignMemLhsObj = b;
    tmpNestedAssignObj = b;
    tmpNestedPropAssignRhs = 3;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    tmpAssignMemRhs = tmpNestedPropAssignRhs;
    tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
  } else {
    break;
  }
}
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: 1,{"c":3},"unused",3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
