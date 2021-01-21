# Preval test case

# sequence-simple.md

> normalize > assignment > logic-left > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$(((a, b).c = d) && $(true));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  {
    a;
    b.c = d;
  }
  let tmpAssignLogicStmtOr = d;
  if (tmpAssignLogicStmtOr) {
    tmpArg = $(true);
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
let b = { c: 2 };
b.c = 3;
tmpArg = $(true);
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: null
 - 2: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same