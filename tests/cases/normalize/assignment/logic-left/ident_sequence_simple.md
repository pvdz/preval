# Preval test case

# ident_sequence_simple.md

> normalize > assignment > logic-left > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$((a = ($(b), c)) && $(true));
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
$(2);
a = 3;
tmpArg = $(true);
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: true
 - 2: null
 - 3: 3,2,3
 - 4: undefined

Normalized calls: Same

Final output calls: Same