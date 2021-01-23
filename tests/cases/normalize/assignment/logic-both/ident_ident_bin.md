# Preval test case

# ident_ident_bin.md

> normalize > assignment > logic-both > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$((a = b = c + d) && (a = b = c + d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
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
    tmpNestedComplexRhs$1 = c + d;
    b = tmpNestedComplexRhs$1;
    a = tmpNestedComplexRhs$1;
    tmpArg = tmpNestedComplexRhs$1;
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
var tmpNestedComplexRhs$1;
let a = 1;
let b = 2;
tmpNestedComplexRhs = 11;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpAssignLogicStmtOr = tmpNestedComplexRhs;
if (tmpAssignLogicStmtOr) {
  tmpNestedComplexRhs$1 = 11;
  b = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs$1;
  tmpArg = tmpNestedComplexRhs$1;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, b, 11);
`````

## Result

Should call `$` with:
 - 0: 7
 - 1: 7,7,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[11], [11, 11, 11], null];

