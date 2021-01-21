# Preval test case

# member_simple_simple.md

> normalize > assignment > logic-left > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$((a.x = b) && $(true));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  a.x = b;
  let tmpAssignLogicStmtOr = b;
  if (tmpAssignLogicStmtOr) {
    tmpArg = $(true);
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
let a = { x: 10 };
a.x = 2;
tmpArg = $(true);
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: true
 - 2: {"x":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
