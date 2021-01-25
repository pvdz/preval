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
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpNestedAssignObj = $(c);
    tmpNestedAssignMemberObj = tmpNestedAssignObj;
    tmpNestedAssignMemberRhs = $(d);
    tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
    tmpNestedComplexRhs$1 = tmpNestedAssignMemberRhs;
    b = tmpNestedComplexRhs$1;
    tmpNestedComplexRhs = tmpNestedComplexRhs$1;
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
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpNestedAssignObj = $(c);
    tmpNestedAssignMemberObj = tmpNestedAssignObj;
    tmpNestedAssignMemberRhs = $(d);
    tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
    tmpNestedComplexRhs$1 = tmpNestedAssignMemberRhs;
    b = tmpNestedComplexRhs$1;
    tmpNestedComplexRhs = tmpNestedComplexRhs$1;
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
$(1, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: 4,4,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

