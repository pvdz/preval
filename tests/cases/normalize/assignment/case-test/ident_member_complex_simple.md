# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > case-test > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
switch (1) { case a = $(b).x = c: $('yes'); break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedComplexRhs;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpNestedAssignObj = $(b);
    tmpNestedPropAssignRhs = c;
    tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
    tmpNestedComplexRhs = tmpNestedPropAssignRhs;
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
    tmpNestedAssignObj = $(b);
    tmpNestedPropAssignRhs = c;
    tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
    tmpNestedComplexRhs = tmpNestedPropAssignRhs;
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
 - 0: {"x":3}
 - 1: 3,{"x":3},3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 2 }], '<crash[ <ref> is not defined ]>'];

