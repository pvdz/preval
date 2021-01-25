# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > case-test > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
switch (1) { case $(a)[$('x')] = b: $('yes'); break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpNestedAssignObj = $(a);
    tmpNestedAssignComMemberObj = tmpNestedAssignObj;
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedPropAssignRhs = b;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    tmpBinaryRight = tmpNestedPropAssignRhs;
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
let a = { x: 10 };
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpNestedAssignObj = $(a);
    tmpNestedAssignComMemberObj = tmpNestedAssignObj;
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedPropAssignRhs = b;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    tmpBinaryRight = tmpNestedPropAssignRhs;
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
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: "x"
 - 2: {"x":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 10 }], ['x'], '<crash[ <ref> is not defined ]>'];

