# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > case-block > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch ($('a')) { case $('a'): a = b[$('x')] = $(c)[$('y')] = $(d); break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedAssignObj;
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
          tmpNestedAssignComMemberObj = b;
          tmpNestedAssignComMemberProp = $('x');
          tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
          tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
          tmpNestedAssignObj = $(c);
          tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj;
          tmpNestedAssignComMemberProp$1 = $('y');
          tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
          tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
          tmpNestedAssignCompMemberRhs$1 = $(d);
          tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
          tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1;
          tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
          a = tmpNestedAssignCompMemberRhs;
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
        tmpNestedAssignComMemberObj = b;
        tmpNestedAssignComMemberProp = $('x');
        tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
        tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
        tmpNestedAssignObj = $(c);
        tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj;
        tmpNestedAssignComMemberProp$1 = $('y');
        tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
        tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
        tmpNestedAssignCompMemberRhs$1 = $(d);
        tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
        tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1;
        tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
        a = tmpNestedAssignCompMemberRhs;
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
 - 2: "x"
 - 3: 3
 - 4: "y"
 - 5: 4
 - 6: 4,{"x":4},3
 - 7: undefined

Normalized calls: Same

Final output calls: BAD!!
[['a'], '<crash[ <ref> is not defined ]>'];

