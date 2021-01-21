# Preval test case

# member_complex_bin.md

> normalize > assignment > default > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
switch ($('a')) { default: $(a).x = b + c; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  const tmpSwitchTest = $('a');
  {
    let tmpFallthrough = false;
    {
      ('default case:');
      tmpAssignMemLhsObj = $(a);
      tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
      tmpAssignMemRhs = b + c;
      tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
      tmpAssignMemLhsObj_2.x = tmpAssignMemRhs;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
let a = { x: 10 };
$('a');
tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpAssignMemRhs = 5;
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj_2.x = tmpAssignMemRhs;
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: {"x":5}
 - 2: {"x":5},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[['a'], [{ x: 5 }], [{ x: 5 }, 5, 3], null];

