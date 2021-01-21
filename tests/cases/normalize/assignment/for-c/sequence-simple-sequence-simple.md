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
var tmpBinaryLeft;
var tmpPostfixArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
let n = 1;
{
  while (true) {
    {
      tmpPostfixArg = n;
      n = n - 1;
      tmpBinaryLeft = tmpPostfixArg;
      let ifTestTmp = tmpBinaryLeft > 0;
      if (ifTestTmp) {
        {
          a;
          {
            tmpAssignMemLhsObj = b;
            a;
            tmpNestedAssignObj = b;
            tmpNestedAssignObj.c = d;
            tmpAssignMemRhs = d;
            tmpAssignMemLhsObj.c = tmpAssignMemRhs;
          }
        }
      } else {
        break;
      }
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = tmpPostfixArg;
  let ifTestTmp = tmpBinaryLeft > 0;
  if (ifTestTmp) {
    tmpAssignMemLhsObj = b;
    tmpNestedAssignObj = b;
    tmpNestedAssignObj.c = 3;
    tmpAssignMemRhs = 3;
    tmpAssignMemLhsObj.c = tmpAssignMemRhs;
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
