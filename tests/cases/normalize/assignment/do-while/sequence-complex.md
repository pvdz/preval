# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
let n = 0;
do { if ($(n++)) break; } while ((a, $(b)).c = d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpDoWhileTest;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpPostfixArg;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  const tmpIfTest = $(tmpArg);
  if (tmpIfTest) {
    break;
  }
  a;
  tmpNestedAssignObj = $(b);
  tmpNestedPropAssignRhs = d;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  tmpDoWhileTest = tmpNestedPropAssignRhs;
} while (tmpDoWhileTest);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpDoWhileTest;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpPostfixArg;
let b = { c: 2 };
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  const tmpIfTest = $(tmpArg);
  if (tmpIfTest) {
    break;
  }
  tmpNestedAssignObj = $(b);
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  tmpDoWhileTest = tmpNestedPropAssignRhs;
} while (tmpDoWhileTest);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: {"c":3}
 - 2: 1
 - 3: 1,{"c":3},"unused",3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
