# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > case-test > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
switch (1) { case (a, $(b)).c = (a, $(b)).c = d: $('yes'); break; }
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      a;
      tmpNestedAssignObj = $(b);
      tmpNestedAssignMemberObj = tmpNestedAssignObj;
      a;
      tmpNestedAssignObj$1 = $(b);
      tmpNestedPropAssignRhs = d;
      tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs;
      tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
      tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
      tmpBinaryRight = tmpNestedAssignMemberRhs;
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
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { c: 2 };
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      a;
      tmpNestedAssignObj = $(b);
      tmpNestedAssignMemberObj = tmpNestedAssignObj;
      a;
      tmpNestedAssignObj$1 = $(b);
      tmpNestedPropAssignRhs = d;
      tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs;
      tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
      tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
      tmpBinaryRight = tmpNestedAssignMemberRhs;
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
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: {"c":3}
 - 2: 1,{"c":3},"unused",3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ c: 2 }], [{ c: 2 }], '<crash[ <ref> is not defined ]>'];

