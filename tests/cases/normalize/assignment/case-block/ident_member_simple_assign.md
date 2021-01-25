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
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
const tmpSwitchTest = $('a');
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpBinaryLeft = tmpSwitchTest;
    tmpBinaryRight = $('a');
    tmpIfTest = tmpBinaryLeft === tmpBinaryRight;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      tmpNestedAssignMemberObj = b;
      tmpNestedAssignObj = $(c);
      tmpNestedAssignMemberObj$1 = tmpNestedAssignObj;
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
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 2 };
$('a');
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpBinaryLeft = tmpSwitchTest;
    tmpBinaryRight = $('a');
    tmpIfTest = tmpBinaryLeft === tmpBinaryRight;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      tmpNestedAssignMemberObj = b;
      tmpNestedAssignObj = $(c);
      tmpNestedAssignMemberObj$1 = tmpNestedAssignObj;
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

