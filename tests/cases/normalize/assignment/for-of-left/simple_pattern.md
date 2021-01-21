# Preval test case

# simple_pattern.md

> normalize > assignment > for-of-left > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
for ((a = [x, y] = z).x of []);
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedComplexRhs;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of []) {
    {
      arrAssignPatternRhs = z;
      arrPatternSplat = [...arrAssignPatternRhs];
      x = arrPatternSplat[0];
      y = arrPatternSplat[1];
      tmpNestedComplexRhs = arrAssignPatternRhs;
      a = tmpNestedComplexRhs;
      tmpAssignMemLhsObj = tmpNestedComplexRhs;
      tmpAssignMemRhs = tmpForOfLhsNode;
      tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    }
  }
}
$(a, x, y, z);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedComplexRhs;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let tmpForOfLhsNode;
for (tmpForOfLhsNode of []) {
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  tmpNestedComplexRhs = arrAssignPatternRhs;
  a = tmpNestedComplexRhs;
  tmpAssignMemLhsObj = tmpNestedComplexRhs;
  tmpAssignMemRhs = tmpForOfLhsNode;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
$(a, x, y, z);
`````

## Result

Should call `$` with:
 - 0: 1,1,2,[10,20,30]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
