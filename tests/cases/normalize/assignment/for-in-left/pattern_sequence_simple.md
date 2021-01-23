# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > for-in-left > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
for (([x, y] = ($(x), $(y), z)).x in {});
$(x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var tmpAssignMemLhsObj;
let x = 1;
let y = 2;
let z = [10, 20, 30];
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in {}) {
    $(x);
    $(y);
    arrAssignPatternRhs = z;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    tmpAssignMemLhsObj = arrAssignPatternRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var tmpAssignMemLhsObj;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let tmpForInLhsNode;
for (tmpForInLhsNode in {}) {
  $(x);
  $(y);
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  tmpAssignMemLhsObj = arrAssignPatternRhs;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: 1,2,[10,20,30]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
