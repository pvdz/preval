# Preval test case

# ident_sequence_simple.md

> normalize > assignment > logic-both > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$((a = ($(b), c)) && (a = ($(b), c)));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a = 1;
let b = 2;
let c = 3;
{
  $(b);
  a = c;
  let tmpAssignLogicStmtOr = c;
  if (tmpAssignLogicStmtOr) {
    $(b);
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
$(2);
a = 3;
$(2);
a = 3;
tmpArg = 3;
$(tmpArg);
$(a, 2, 3);
`````
