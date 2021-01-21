# Preval test case

# ident_simple.md

> normalize > assignment > for-of-left > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for ((a = b).x of []);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
let a = 1;
let b = 2;
let c = 3;
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of []) {
    a = b;
    tmpAssignMemLhsObj = b;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
let a = 1;
let tmpForOfLhsNode;
for (tmpForOfLhsNode of []) {
  a = 2;
  tmpAssignMemLhsObj = 2;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 1,2,3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
