# Preval test case

# ident_simple.md

> normalize > assignment > for-in-left > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for ((a = b).x in {});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
let a = 1;
let b = 2;
let c = 3;
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in {}) {
    a = b;
    tmpAssignMemLhsObj = b;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
let a = 1;
let tmpForInLhsNode;
for (tmpForInLhsNode in {}) {
  a = 2;
  tmpAssignMemLhsObj = 2;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 1,2,3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
