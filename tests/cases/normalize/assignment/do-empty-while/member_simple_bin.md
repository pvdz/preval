# Preval test case

# member_simple_bin.md

> normalize > assignment > do-while > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 0, c = 0;
do {} while (a.x = b + c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
let a = { x: 10 };
let b = 0;
let c = 0;
while (true) {
  tmpAssignMemLhsObj = a;
  tmpAssignMemRhs = b + c;
  tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  const tmpIfTest = tmpAssignMemRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
let a = { x: 10 };
while (true) {
  tmpAssignMemLhsObj = a;
  tmpAssignMemRhs = 0;
  tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  const tmpIfTest = tmpAssignMemRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, 0, 0);
`````

## Result

Should call `$` with:
 - 0: {"x":0},0,0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
