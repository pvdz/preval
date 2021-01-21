# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > case-block > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): a = $(b)[$('x')] = $(c)[$('y')] = $(d); break; }
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  const tmpSwitchTest = $('a');
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    {
      let ifTestTmp = tmpFallthrough;
      if (ifTestTmp) {
      } else {
        tmpBinaryLeft = tmpSwitchTest;
        tmpBinaryRight = $('a');
        ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
      }
      if (ifTestTmp) {
        ('case 0:');
        {
          tmpNestedAssignObj = $(b);
          tmpNestedAssignComMemberObj = tmpNestedAssignObj;
          tmpNestedAssignComMemberProp = $('x');
          tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
          tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
          tmpNestedAssignObj_1 = $(c);
          tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj_1;
          tmpNestedAssignComMemberProp_1 = $('y');
          tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
          tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
          tmpNestedAssignCompMemberRhs_1 = $(d);
          tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
          tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
          tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
          a = tmpNestedAssignCompMemberRhs;
          break tmpSwitchBreak;
        }
        tmpFallthrough = true;
      }
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { x: 2 };
$('a');
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpBinaryLeft = tmpSwitchTest;
      tmpBinaryRight = $('a');
      ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        tmpNestedAssignObj = $(b);
        tmpNestedAssignComMemberObj = tmpNestedAssignObj;
        tmpNestedAssignComMemberProp = $('x');
        tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
        tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
        tmpNestedAssignObj_1 = $(c);
        tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj_1;
        tmpNestedAssignComMemberProp_1 = $('y');
        tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
        tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
        tmpNestedAssignCompMemberRhs_1 = $(d);
        tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
        tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
        tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
        a = tmpNestedAssignCompMemberRhs;
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(1, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "a"
 - 2: {"x":4}
 - 3: "x"
 - 4: 3
 - 5: "y"
 - 6: 4
 - 7: 4,{"x":4},3,4
 - 8: undefined

Normalized calls: Same

Final output calls: BAD!!
[['a'], '<crash[ <ref> is not defined ]>'];

