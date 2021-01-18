# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > for-b > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (;a = $(b).x = $(c).y = $(d););
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  while (true) {
    {
      tmpNestedAssignMemberObj = $(b);
      tmpNestedAssignMemberObj_1 = $(c);
      tmpNestedAssignMemberRhs_1 = $(d);
      tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
      tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
      tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
      a = tmpNestedAssignMemberRhs;
      let ifTestTmp = a;
      if (ifTestTmp) {
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
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = { x: 2 };
while (true) {
  tmpNestedAssignMemberObj = $(b);
  tmpNestedAssignMemberObj_1 = $(3);
  tmpNestedAssignMemberRhs_1 = $(4);
  tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
  tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  let ifTestTmp = a;
  if (ifTestTmp) {
  } else {
    break;
  }
}
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
[[{ x: 2 }], [3], [4], "<crash[ Cannot set property 'y' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
