# Preval test case

# ident_ident_assign.md

> normalize > assignment > case-test > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
switch (1) { case a = b = $(c).y = $(d): $('yes'); break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpNestedAssignMemberObj = $(c);
      tmpNestedAssignMemberRhs = $(d);
      tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
      tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs;
      b = tmpNestedComplexRhs_1;
      tmpNestedComplexRhs = tmpNestedComplexRhs_1;
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
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpNestedAssignMemberObj = $(c);
      tmpNestedAssignMemberRhs = $(d);
      tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
      tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs;
      b = tmpNestedComplexRhs_1;
      tmpNestedComplexRhs = tmpNestedComplexRhs_1;
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
$(1, 2, 3);
`````

## Result

Should call `$` with:
[[3], [4], "<crash[ Cannot set property 'y' of undefined ]>"];

Normalized calls: Same

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

