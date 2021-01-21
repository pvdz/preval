# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > case-test > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch (1) { case a = b.x = $(c).y = $(d): $('yes'); break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpNestedAssignMemberObj = b;
      tmpNestedAssignMemberObj_1 = $(c);
      tmpNestedAssignMemberRhs_1 = $(d);
      tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
      tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
      tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
      tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
      a = tmpNestedComplexRhs;
      tmpBinaryRight = tmpNestedComplexRhs;
      ifTestTmp = 1 === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        $('yes');
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 2 };
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpNestedAssignMemberObj = b;
      tmpNestedAssignMemberObj_1 = $(c);
      tmpNestedAssignMemberRhs_1 = $(d);
      tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
      tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
      tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
      tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
      a = tmpNestedComplexRhs;
      tmpBinaryRight = tmpNestedComplexRhs;
      ifTestTmp = 1 === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        $('yes');
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
 - 0: 3
 - 1: 4
 - 2: <crash[ Cannot set property 'y' of undefined ]>

Normalized calls: Same

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

