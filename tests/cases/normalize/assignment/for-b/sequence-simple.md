# Preval test case

# sequence-simple.md

> normalize > assignment > for-b > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 0;
for (;(a, b).c = d;);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = 1;
let b = { c: 2 };
let d = 0;
{
  while (true) {
    {
      a;
      tmpAssignMemLhsObj = b;
      tmpAssignMemRhs = d;
      tmpAssignMemLhsObj.c = tmpAssignMemRhs;
      let ifTestTmp = d;
      if (ifTestTmp) {
      } else {
        break;
      }
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let b = { c: 2 };
while (true) {
  tmpAssignMemLhsObj = b;
  tmpAssignMemRhs = 0;
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  break;
}
$(1, b, c, 0);
`````

## Result

Should call `$` with:
['<crash[ <ref> is not defined ]>'];

Normalized calls: Same

Final output calls: Same
