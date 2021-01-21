# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > case-test > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
switch (1) { case a = b[$('x')] = $(c)[$('y')] = $(d): $('yes'); break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
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
      tmpNestedAssignCompMemberObj = b;
      tmpNestedAssignCompMemberProp = $('x');
      tmpNestedAssignCompMemberObj_1 = $(c);
      tmpNestedAssignCompMemberProp_1 = $('y');
      tmpNestedAssignCompMemberRhs_1 = $(d);
      tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
      tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
      tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
      tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
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
      tmpNestedAssignCompMemberObj = b;
      tmpNestedAssignCompMemberProp = $('x');
      tmpNestedAssignCompMemberObj_1 = $(c);
      tmpNestedAssignCompMemberProp_1 = $('y');
      tmpNestedAssignCompMemberRhs_1 = $(d);
      tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
      tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
      tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
      tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
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
 - 0: "x"
 - 1: 3
 - 2: "y"
 - 3: 4
 - 4: <crash[ Cannot set property 'undefined' of undefined ]>

Normalized calls: Same

Final output calls: BAD!!
[['x'], '<crash[ <ref> is not defined ]>'];
