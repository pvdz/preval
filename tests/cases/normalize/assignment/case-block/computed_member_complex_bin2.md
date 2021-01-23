# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > case-block > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
switch ($('a', 1)) {
  case $('a', 2): 
    a['x'] = b + c;
  break;
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpBinaryLeft;
var tmpBinaryRight;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  const tmpSwitchTest = $('a', 1);
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    {
      let ifTestTmp = tmpFallthrough;
      if (ifTestTmp) {
      } else {
        tmpBinaryLeft = tmpSwitchTest;
        tmpBinaryRight = $('a', 2);
        ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
      }
      if (ifTestTmp) {
        ('case 0:');
        {
          tmpAssignComputedObj = a;
          tmpAssignComputedProp = 'x';
          tmpAssignComputedRhs = b + c;
          tmpAssignMemLhsObj = tmpAssignComputedObj;
          tmpAssignMemLhsObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
          break tmpSwitchBreak;
        }
        tmpFallthrough = true;
      }
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = { x: 10 };
$('a', 1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpBinaryLeft = tmpSwitchTest;
      tmpBinaryRight = $('a', 2);
      ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        tmpAssignComputedObj = a;
        tmpAssignComputedProp = 'x';
        tmpAssignComputedRhs = b + c;
        tmpAssignMemLhsObj = tmpAssignComputedObj;
        tmpAssignMemLhsObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
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
 - 0: "a",1
 - 1: "a",2
 - 2: {"x":5},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[['a', 1], '<crash[ <ref> is not defined ]>'];

