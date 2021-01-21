# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > case-block > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
switch ($('a')) { case $('a'): (a, b).c = (a, b).c = d; break; }
$(a, b, d);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_1;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
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
            tmpAssignMemLhsObj = b;
            a;
            tmpNestedAssignObj = b;
            tmpNestedPropAssignRhs = d;
            tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
            tmpAssignMemRhs = tmpNestedPropAssignRhs;
            tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
            tmpAssignMemLhsObj_1.c = tmpAssignMemRhs;
          }
          break tmpSwitchBreak;
        }
        tmpFallthrough = true;
      }
    }
  }
}
$(a, b, d);
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
          tmpAssignMemLhsObj = b;
          a;
          tmpNestedAssignObj = b;
          tmpNestedPropAssignRhs = d;
          tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
          tmpAssignMemRhs = tmpNestedPropAssignRhs;
          tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
          tmpAssignMemLhsObj_1.c = tmpAssignMemRhs;
        }
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
 - 0: "a"
 - 1: "a"
 - 2: 1,{"c":3},3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[['a'], '<crash[ <ref> is not defined ]>'];

