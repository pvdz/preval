# Preval test case

# ident_sequence_simple.md

> normalize > assignment > for-in-left > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for ((a = ($(b), c)).x in {});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in {}) {
    {
      $(b);
      tmpNestedComplexRhs = c;
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
let a = 1;
let tmpForInLhsNode;
for (tmpForInLhsNode in {}) {
  $(2);
  tmpNestedComplexRhs = 3;
  a = tmpNestedComplexRhs;
  tmpAssignMemLhsObj = tmpNestedComplexRhs;
  tmpAssignMemRhs = tmpForInLhsNode;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 1,2,3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
