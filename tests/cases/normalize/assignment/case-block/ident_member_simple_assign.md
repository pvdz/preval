# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > case-block > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): a = b.x = $(c).y = $(d); break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
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
          tmpNestedAssignMemberObj = b;
          tmpNestedAssignObj = $(c);
          tmpNestedAssignMemberObj_1 = tmpNestedAssignObj;
          tmpNestedAssignMemberRhs_1 = $(d);
          tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
          tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
          tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
          a = tmpNestedAssignMemberRhs;
          break tmpSwitchBreak;
        }
        tmpFallthrough = true;
      }
    }
  }
}
$(a, b, c);
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
        tmpNestedAssignMemberObj = b;
        tmpNestedAssignObj = $(c);
        tmpNestedAssignMemberObj_1 = tmpNestedAssignObj;
        tmpNestedAssignMemberRhs_1 = $(d);
        tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
        tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
        tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
        a = tmpNestedAssignMemberRhs;
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(1, b, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "a"
 - 2: 3
 - 3: 4
 - 4: 4,{"x":4},3
 - 5: undefined

Normalized calls: Same

Final output calls: BAD!!
[['a'], '<crash[ <ref> is not defined ]>'];

