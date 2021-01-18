# Preval test case

# member_simple_bin.md

> normalize > assignment > case-test > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
switch (1) { case a.x = b + c: $('yes'); break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpNestedAssignMemberObj = a;
      tmpNestedAssignMemberRhs = b + c;
      tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
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
      tmpNestedAssignMemberObj = a;
      tmpNestedAssignMemberRhs = b + c;
      tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
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
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[{ x: 5 }, 2, 3], null];

Normalized calls: Same

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

