# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > case-test > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
switch (1) { case a[$('x')] = b + c: $('yes'); break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpNestedAssignCompMemberObj = a;
      tmpNestedAssignCompMemberProp = $('x');
      tmpNestedAssignCompMemberRhs = b + c;
      tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
      tmpBinaryRight = tmpNestedAssignCompMemberRhs;
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
let a = { x: 10 };
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpNestedAssignCompMemberObj = a;
      tmpNestedAssignCompMemberProp = $('x');
      tmpNestedAssignCompMemberRhs = b + c;
      tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
      tmpBinaryRight = tmpNestedAssignCompMemberRhs;
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
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: {"x":10,"undefined":5},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], '<crash[ <ref> is not defined ]>'];

