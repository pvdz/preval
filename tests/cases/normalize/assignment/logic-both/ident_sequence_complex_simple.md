# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$((a = ($(b), $(c)).x = c) && (a = ($(b), $(c)).x = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs$1;
let a = 1;
let b = 2;
let c = 3;
{
  $(b);
  tmpNestedAssignObj = $(c);
  tmpNestedPropAssignRhs = c;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpAssignLogicStmtOr = tmpNestedPropAssignRhs;
  if (tmpAssignLogicStmtOr) {
    $(b);
    tmpNestedAssignObj$1 = $(c);
    tmpNestedPropAssignRhs$1 = c;
    tmpNestedAssignObj$1.x = tmpNestedPropAssignRhs$1;
    a = tmpNestedPropAssignRhs$1;
    tmpArg = tmpNestedPropAssignRhs$1;
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
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs$1;
let a = 1;
$(2);
tmpNestedAssignObj = $(3);
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpAssignLogicStmtOr = tmpNestedPropAssignRhs;
if (tmpAssignLogicStmtOr) {
  $(2);
  tmpNestedAssignObj$1 = $(3);
  tmpNestedPropAssignRhs$1 = 3;
  tmpNestedAssignObj$1.x = tmpNestedPropAssignRhs$1;
  a = tmpNestedPropAssignRhs$1;
  tmpArg = tmpNestedPropAssignRhs$1;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: 2
 - 3: 3
 - 4: 3
 - 5: 3,2,3
 - 6: undefined

Normalized calls: Same

Final output calls: Same
