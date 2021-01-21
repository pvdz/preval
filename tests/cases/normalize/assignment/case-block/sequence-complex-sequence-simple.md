# Preval test case

# sequence-complex-sequence-simple.md

> normalize > assignment > case-block > sequence-complex-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
switch ($('a')) { case $('a'): (a, $(b)).c = (a, b).c = d; break; }
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
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
            a;
            {
              tmpAssignMemLhsObj = $(b);
              a;
              tmpNestedAssignObj = b;
              tmpNestedAssignObj.c = d;
              tmpAssignMemRhs = d;
              tmpAssignMemLhsObj.c = tmpAssignMemRhs;
            }
          }
          break tmpSwitchBreak;
        }
        tmpFallthrough = true;
      }
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { c: 2 };
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
          a;
          {
            tmpAssignMemLhsObj = $(b);
            a;
            tmpNestedAssignObj = b;
            tmpNestedAssignObj.c = d;
            tmpAssignMemRhs = d;
            tmpAssignMemLhsObj.c = tmpAssignMemRhs;
          }
        }
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "a"
 - 2: {"c":3}
 - 3: <crash[ Cannot set property 'c' of undefined ]>

Normalized calls: Same

Final output calls: BAD!!
[['a'], '<crash[ <ref> is not defined ]>'];
