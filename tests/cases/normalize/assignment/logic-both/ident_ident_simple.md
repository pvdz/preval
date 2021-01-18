# Preval test case

# ident_ident_simple.md

> normalize > assignment > logic-both > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$((a = b = c) && (a = b = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a = 1;
let b = 2;
let c = 3;
{
  b = c;
  a = c;
  let tmpAssignLogicStmtOr = c;
  if (tmpAssignLogicStmtOr) {
    b = c;
    a = c;
    tmpArg = c;
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
let a = 1;
let b = 2;
b = 3;
a = 3;
b = 3;
a = 3;
tmpArg = 3;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
[[3], [3, 3, 3], null];

Normalized calls: Same

Final output calls: Same
