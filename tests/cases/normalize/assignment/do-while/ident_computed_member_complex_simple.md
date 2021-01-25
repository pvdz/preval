# Preval test case

# ident_computed_member_complex_simple.md

> normalize > assignment > do-while > ident_computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
let n = 0;
do { if ($(n++)) break; } while (a = $(b)[$('x')] = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpDoWhileTest;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignObj;
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
  tmpNestedAssignObj = $(b);
  tmpNestedAssignComMemberObj = tmpNestedAssignObj;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedPropAssignRhs = c;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
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
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignObj;
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
  tmpNestedAssignObj = $(b);
  tmpNestedAssignComMemberObj = tmpNestedAssignObj;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: {"x":3}
 - 2: "x"
 - 3: 1
 - 4: 3,{"x":3},3
 - 5: undefined

Normalized calls: Same

Final output calls: Same
