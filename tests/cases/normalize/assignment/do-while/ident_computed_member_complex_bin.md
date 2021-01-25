# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > do-while > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
let n = 0;
do { if ($(n++)) break; } while (a = $(b)[$('x')] = c + d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpDoWhileTest;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
var tmpNestedComplexRhs;
var tmpPostfixArg;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
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
  tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
  tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
  tmpNestedAssignCompMemberRhs = c + d;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
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
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
var tmpNestedComplexRhs;
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
  tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
  tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
  tmpNestedAssignCompMemberRhs = 7;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: {"x":7}
 - 2: "x"
 - 3: 1
 - 4: 7,{"x":7},3
 - 5: undefined

Normalized calls: Same

Final output calls: BAD!!
[[0], [{ x: 7 }], ['x'], [1], [7, { x: 7 }, 7], null];

