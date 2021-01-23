# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > case-block > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): a = $(b).x = $(c).y = $(d); break; }
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs$1;
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
          tmpNestedAssignMemberObj = tmpNestedAssignObj;
          tmpNestedAssignObj$1 = $(c);
          tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
          tmpNestedAssignMemberRhs$1 = $(d);
          tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
          tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
          tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
          a = tmpNestedAssignMemberRhs;
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
        tmpNestedAssignMemberObj = tmpNestedAssignObj;
        tmpNestedAssignObj$1 = $(c);
        tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
        tmpNestedAssignMemberRhs$1 = $(d);
        tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
        tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
        tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
        a = tmpNestedAssignMemberRhs;
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
 - 3: 3
 - 4: 4
 - 5: 4,{"x":4},3,4
 - 6: undefined

Normalized calls: Same

Final output calls: BAD!!
[['a'], '<crash[ <ref> is not defined ]>'];

