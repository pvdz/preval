# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > for-c > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
let n = 1;
for (;n-->0;  a = b[$('x')] = $(c)[$('y')] = $(d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
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
        tmpNestedAssignComMemberObj = b;
        tmpNestedAssignComMemberProp = $('x');
        tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
        tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
        tmpNestedAssignObj = $(c);
        tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj;
        tmpNestedAssignComMemberProp_1 = $('y');
        tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
        tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
        tmpNestedAssignCompMemberRhs_1 = $(d);
        tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
        tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
        tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
        a = tmpNestedAssignCompMemberRhs;
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
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = 1;
let b = { x: 2 };
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = tmpPostfixArg;
  let ifTestTmp = tmpBinaryLeft > 0;
  if (ifTestTmp) {
    tmpNestedAssignComMemberObj = b;
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
    tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
    tmpNestedAssignObj = $(3);
    tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj;
    tmpNestedAssignComMemberProp_1 = $('y');
    tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
    tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
    tmpNestedAssignCompMemberRhs_1 = $(4);
    tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
    tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
    tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
    a = tmpNestedAssignCompMemberRhs;
  } else {
    break;
  }
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 3
 - 2: "y"
 - 3: 4
 - 4: 4,{"x":4},3
 - 5: undefined

Normalized calls: Same

Final output calls: Same
