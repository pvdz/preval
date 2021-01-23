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
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs$1;
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
 - 4: 4,{"x":4},3
 - 5: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], '<crash[ <ref> is not defined ]>'];

