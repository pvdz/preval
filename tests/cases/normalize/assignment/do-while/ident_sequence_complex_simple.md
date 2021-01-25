# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let n = 0;
do { if ($(n++)) break; } while (a = ($(b), $(c)).x = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpDoWhileTest;
var tmpNestedAssignObj;
var tmpNestedComplexRhs;
var tmpNestedPropAssignRhs;
var tmpPostfixArg;
let a = 1;
let b = 2;
let c = 3;
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  const tmpIfTest = $(tmpArg);
  if (tmpIfTest) {
    break;
  }
  $(b);
  tmpNestedAssignObj = $(c);
  tmpNestedPropAssignRhs = c;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpDoWhileTest;
var tmpNestedAssignObj;
var tmpNestedComplexRhs;
var tmpNestedPropAssignRhs;
var tmpPostfixArg;
let a = 1;
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  const tmpIfTest = $(tmpArg);
  if (tmpIfTest) {
    break;
  }
  $(2);
  tmpNestedAssignObj = $(3);
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: 2
 - 2: 3
 - 3: 1
 - 4: 3,2,3
 - 5: undefined

Normalized calls: Same

Final output calls: Same
