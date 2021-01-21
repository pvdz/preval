# Preval test case

# ident_ident_bin.md

> normalize > assignment > for-in-left > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
for ((a = b = c + d).x in {});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in {}) {
    {
      tmpNestedComplexRhs_1 = c + d;
      b = tmpNestedComplexRhs_1;
      tmpNestedComplexRhs = tmpNestedComplexRhs_1;
      a = tmpNestedComplexRhs;
      tmpAssignMemLhsObj = tmpNestedComplexRhs;
      tmpAssignMemRhs = tmpForInLhsNode;
      tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
let a = 1;
let b = 2;
let tmpForInLhsNode;
for (tmpForInLhsNode in {}) {
  tmpNestedComplexRhs_1 = 7;
  b = tmpNestedComplexRhs_1;
  tmpNestedComplexRhs = tmpNestedComplexRhs_1;
  a = tmpNestedComplexRhs;
  tmpAssignMemLhsObj = tmpNestedComplexRhs;
  tmpAssignMemRhs = tmpForInLhsNode;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: 1,2,3
 - 1: undefined

Normalized calls: Same

Final output calls: BAD!!
[[1, 2, 7], null];

