# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > do-while > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
let n = 0;
do { if ($(n++)) break; } while (a = $(b)[$('x')] = $(c)[$('y')] = $(d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
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
  tmpNestedAssignObj$1 = $(c);
  tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
  tmpNestedAssignComMemberProp$1 = $('y');
  tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
  tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
  tmpNestedAssignCompMemberRhs$1 = $(d);
  tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
  tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
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
  tmpNestedAssignObj$1 = $(3);
  tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
  tmpNestedAssignComMemberProp$1 = $('y');
  tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
  tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
  tmpNestedAssignCompMemberRhs$1 = $(4);
  tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
  tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: {"x":4}
 - 2: "x"
 - 3: 3
 - 4: "y"
 - 5: 4
 - 6: 1
 - 7: 4,{"x":4},3,4
 - 8: undefined

Normalized calls: Same

Final output calls: Same
