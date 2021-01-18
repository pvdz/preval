# Preval test case

# member_simple_simple.md

> normalize > assignment > logic-right > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(true) || (a.x = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    a.x = b;
    tmpArg = b;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
let a = { x: 10 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  a.x = 2;
  tmpArg = 2;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[true], [2], [{ x: 2 }, 2, 3], null];

Normalized calls: Same

Final output calls: Same
