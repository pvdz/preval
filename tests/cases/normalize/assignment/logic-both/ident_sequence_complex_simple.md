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
var tmpNestedAssignObj_1;
let a = 1;
let b = 2;
let c = 3;
{
  $(b);
  tmpNestedAssignObj = $(c);
  tmpNestedAssignObj.x = c;
  a = c;
  let tmpAssignLogicStmtOr = c;
  if (tmpAssignLogicStmtOr) {
    $(b);
    tmpNestedAssignObj_1 = $(c);
    tmpNestedAssignObj_1.x = c;
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
var tmpNestedAssignObj;
var tmpNestedAssignObj_1;
let a = 1;
$(2);
tmpNestedAssignObj = $(3);
tmpNestedAssignObj.x = 3;
a = 3;
$(2);
tmpNestedAssignObj_1 = $(3);
tmpNestedAssignObj_1.x = 3;
a = 3;
tmpArg = 3;
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
