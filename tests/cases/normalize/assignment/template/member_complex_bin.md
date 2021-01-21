# Preval test case

# member_complex_bin.md

> normalize > assignment > template > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(`abc ${$(a).x = b + c} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpArg = `abc ${
  ((tmpAssignMemLhsObj = $(a)),
  (tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj),
  (tmpAssignMemRhs = b + c),
  (tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1),
  (tmpAssignMemLhsObj_2.x = tmpAssignMemRhs))
} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
let a = { x: 10 };
tmpArg = `abc ${
  ((tmpAssignMemLhsObj = $(a)),
  (tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj),
  (tmpAssignMemRhs = 5),
  (tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1),
  (tmpAssignMemLhsObj_2.x = tmpAssignMemRhs))
} def`;
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: "abc 5 def"
 - 2: {"x":5},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 5 }], ['abc 5 def'], [{ x: 5 }, 5, 3], null];

