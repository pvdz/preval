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
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedComplexRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpNestedAssignMemberObj = b;
    tmpNestedAssignObj = $(c);
    tmpNestedAssignMemberObj$1 = tmpNestedAssignObj;
    tmpNestedAssignMemberRhs$1 = $(d);
    tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
    tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
    tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
    tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
    a = tmpNestedComplexRhs;
    tmpBinaryRight = tmpNestedComplexRhs;
    tmpIfTest = 1 === tmpBinaryRight;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      $('yes');
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 2 };
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpNestedAssignMemberObj = b;
    tmpNestedAssignObj = $(c);
    tmpNestedAssignMemberObj$1 = tmpNestedAssignObj;
    tmpNestedAssignMemberRhs$1 = $(d);
    tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
    tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
    tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
    tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
    a = tmpNestedComplexRhs;
    tmpBinaryRight = tmpNestedComplexRhs;
    tmpIfTest = 1 === tmpBinaryRight;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      $('yes');
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(1, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: 4,{"x":4},3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

