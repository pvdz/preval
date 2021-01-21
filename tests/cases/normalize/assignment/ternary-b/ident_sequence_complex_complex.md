# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$($(true) ? (a = ($(b), $(c)).x = $(c)) : false);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
let c = 3;
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  $(b);
  tmpNestedAssignObj = $(c);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs = $(c);
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
  a = tmpNestedComplexRhs;
  tmpTernaryConsequent = tmpNestedComplexRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  $(2);
  tmpNestedAssignObj = $(3);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs = $(3);
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
  a = tmpNestedComplexRhs;
  tmpTernaryConsequent = tmpNestedComplexRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: 2
 - 2: 3
 - 3: 3
 - 4: 3
 - 5: 3,2,3
 - 6: undefined

Normalized calls: Same

Final output calls: Same
