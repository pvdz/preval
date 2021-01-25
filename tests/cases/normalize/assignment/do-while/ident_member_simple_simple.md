# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > do-while > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
let n = 0;
do { if ($(n++)) break; } while (a = b.x = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpNestedComplexRhs;
var tmpNestedPropAssignRhs;
var tmpPostfixArg;
let a = 1;
let b = { x: 2 };
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
  tmpNestedPropAssignRhs = c;
  b.x = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, b, c);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpNestedComplexRhs;
var tmpNestedPropAssignRhs;
var tmpPostfixArg;
let a = 1;
let b = { x: 2 };
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  const tmpIfTest = $(tmpArg);
  if (tmpIfTest) {
    break;
  }
  tmpNestedPropAssignRhs = 3;
  b.x = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: 1
 - 2: 3,{"x":3},3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
