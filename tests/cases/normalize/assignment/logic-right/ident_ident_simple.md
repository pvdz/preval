# Preval test case

# ident_ident_simple.md

> normalize > assignment > logic-right > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$($(true) || (a = b = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a = 1;
let b = 2;
let c = 3;
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    b = c;
    a = c;
    tmpArg = c;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
let a = 1;
let b = 2;
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  b = 3;
  a = 3;
  tmpArg = 3;
}
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
[[true], [3], [3, 3, 3], null];

Normalized calls: Same

Final output calls: Same
