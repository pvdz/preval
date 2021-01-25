# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > case-block > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
switch ($('a')) { case $('a'): a[$('x')] = b; break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpBinaryLeft;
var tmpBinaryRight;
let a = { x: 10 };
let b = 2;
let c = 3;
{
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
        tmpAssignComMemLhsObj = a;
        tmpAssignComMemLhsProp = $('x');
        tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = b;
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
      tmpAssignComMemLhsObj = a;
      tmpAssignComMemLhsProp = $('x');
      tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = b;
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "a"
 - 2: "x"
 - 3: {"x":2},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[['a'], '<crash[ <ref> is not defined ]>'];

