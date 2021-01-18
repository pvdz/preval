# Preval test case

# ident_member_complex_bin.md

> normalize > assignment > for-c > ident_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
let n = 1;
for (;n-->0;  a = $(b).x = c + d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
let n = 1;
{
  while (true) {
    {
      tmpPostfixArg = n;
      n = n - 1;
      tmpBinaryLeft = tmpPostfixArg;
      let ifTestTmp = tmpBinaryLeft > 0;
      if (ifTestTmp) {
        tmpNestedAssignMemberObj = $(b);
        tmpNestedAssignMemberRhs = c + d;
        tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
        a = tmpNestedAssignMemberRhs;
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
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = { x: 2 };
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = tmpPostfixArg;
  let ifTestTmp = tmpBinaryLeft > 0;
  if (ifTestTmp) {
    tmpNestedAssignMemberObj = $(b);
    tmpNestedAssignMemberRhs = 7;
    tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
    a = tmpNestedAssignMemberRhs;
  } else {
    break;
  }
}
$(a, b, 7);
`````

## Result

Should call `$` with:
[[{ x: 2 }], "<crash[ Cannot set property 'x' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
