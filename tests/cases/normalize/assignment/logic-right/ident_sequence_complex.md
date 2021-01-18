# Preval test case

# ident_sequence_complex.md

> normalize > assignment > logic-right > ident_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$($(true) || (a = ($(b), $(c))));
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
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    $(b);
    tmpNestedComplexRhs = $(c);
    a = tmpNestedComplexRhs;
    tmpArg = tmpNestedComplexRhs;
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
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  $(2);
  tmpNestedComplexRhs = $(3);
  a = tmpNestedComplexRhs;
  tmpArg = tmpNestedComplexRhs;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[true], [2], [3], [null], [null, 2, 3], null];

Normalized calls: Same

Final output calls: Same
