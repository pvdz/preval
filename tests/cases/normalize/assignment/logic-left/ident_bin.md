# Preval test case

# ident_bin.md

> normalize > assignment > logic-left > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$((a = b + c) && $(true));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a = 1;
let b = 2;
let c = 3;
{
  a = b + c;
  let tmpAssignLogicStmtOr = a;
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
let a = 1;
a = 5;
let tmpAssignLogicStmtOr = a;
if (tmpAssignLogicStmtOr) {
  tmpArg = $(true);
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: null
 - 2: 5,2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[true], [null], [5, 5, 3], null];

