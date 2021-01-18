# Preval test case

# ident_computed_member_complex_simple.md

> normalize > assignment > case-test > ident_computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
switch (1) { case a = $(b)[$('x')] = c: $('yes'); break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpNestedAssignComMemberObj = $(b);
      tmpNestedAssignComMemberProp = $('x');
      tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = c;
      tmpNestedComplexRhs = c;
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
      tmpNestedAssignComMemberObj = $(b);
      tmpNestedAssignComMemberProp = $('x');
      tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = c;
      tmpNestedComplexRhs = c;
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
[[{ x: 2 }], ['x'], "<crash[ Cannot set property 'undefined' of undefined ]>"];

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 2 }], ['x'], '<crash[ <ref> is not defined ]>'];

