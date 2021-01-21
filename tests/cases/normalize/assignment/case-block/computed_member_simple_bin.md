# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > case-block > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
switch ($('a')) { case $('a'): a[$('x')] = b + c; break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  const tmpSwitchTest = $('a');
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    {
      let ifTestTmp = tmpFallthrough;
      if (ifTestTmp) {
      } else {
        tmpBinaryLeft = tmpSwitchTest;
        tmpBinaryRight = $('a');
        ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
      }
      if (ifTestTmp) {
        ('case 0:');
        {
          {
            tmpAssignComputedObj = a;
            tmpAssignComputedProp = $('x');
            tmpAssignComputedRhs = b + c;
            tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
          }
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
$('a');
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpBinaryLeft = tmpSwitchTest;
      tmpBinaryRight = $('a');
      ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        {
          tmpAssignComputedObj = a;
          tmpAssignComputedProp = $('x');
          tmpAssignComputedRhs = b + c;
          tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
        }
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
 - 0: "a"
 - 1: "a"
 - 2: "x"
 - 3: {"x":10,"undefined":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[['a'], '<crash[ <ref> is not defined ]>'];

