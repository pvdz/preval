# Preval test case

# ident_ident_bin.md

> normalize > assignment > logic-left > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$((a = b = c + d) && $(true));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
{
  tmpNestedComplexRhs = c + d;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let tmpAssignLogicStmtOr = tmpNestedComplexRhs;
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
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
tmpNestedComplexRhs = 7;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpAssignLogicStmtOr = tmpNestedComplexRhs;
if (tmpAssignLogicStmtOr) {
  tmpArg = $(true);
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: null
 - 2: 7,7,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[true], [null], [7, 7, 7], null];

