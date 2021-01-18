# Preval test case

# ident_ident_assign.md

> normalize > assignment > for-c > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
let n = 1;
for (;n-->0;  a = b = $(c).y = $(d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var tmpNestedComplexRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
let n = 1;
{
  while (true) {
    {
      tmpPostfixArg = n;
      n = n - 1;
      tmpBinaryLeft = n;
      let ifTestTmp = tmpBinaryLeft > 0;
      if (ifTestTmp) {
        tmpNestedAssignMemberObj = $(c);
        tmpNestedAssignMemberRhs = $(d);
        tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
        tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
        b = tmpNestedComplexRhs;
        a = tmpNestedComplexRhs;
      } else {
        break;
      }
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var tmpNestedComplexRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = n;
  let ifTestTmp = tmpBinaryLeft > 0;
  if (ifTestTmp) {
    tmpNestedAssignMemberObj = $(3);
    tmpNestedAssignMemberRhs = $(4);
    tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
    tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a, b, 3);
`````

## Result

Should call `$` with:
[[3], [4], "<crash[ Cannot set property 'y' of undefined ]>"];

Normalized calls: BAD?!
[[1, 2, 3], null];

Final output calls: BAD!!
[[1, 2, 3], null];

