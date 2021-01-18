# Preval test case

# ident_sequence_complex.md

> normalize > assignment > logic-both > ident_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$((a = ($(b), $(c))) && (a = ($(b), $(c))));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
let a = 1;
let b = 2;
let c = 3;
{
  $(b);
  a = $(c);
  let tmpAssignLogicStmtOr = a;
  if (tmpAssignLogicStmtOr) {
    $(b);
    tmpNestedComplexRhs = $(c);
    a = tmpNestedComplexRhs;
    tmpArg = tmpNestedComplexRhs;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
let a = 1;
$(2);
a = $(3);
let tmpAssignLogicStmtOr = a;
if (tmpAssignLogicStmtOr) {
  $(2);
  tmpNestedComplexRhs = $(3);
  a = tmpNestedComplexRhs;
  tmpArg = tmpNestedComplexRhs;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[2], [3], [null], [null, 2, 3], null];

Normalized calls: Same

Final output calls: Same
