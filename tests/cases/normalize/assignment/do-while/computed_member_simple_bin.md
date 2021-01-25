# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > do-while > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let n = 0;
do { if ($(n++)) break; } while (a[$('x')] = b + c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpPostfixArg;
let a = { x: 10 };
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
  tmpNestedAssignComMemberObj = a;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
  tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
  tmpNestedAssignCompMemberRhs = b + c;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  ifTestTmp = tmpNestedAssignCompMemberRhs;
} while (ifTestTmp);
$(a, b, c);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpPostfixArg;
let a = { x: 10 };
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  const tmpIfTest = $(tmpArg);
  if (tmpIfTest) {
    break;
  }
  tmpNestedAssignComMemberObj = a;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
  tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
  tmpNestedAssignCompMemberRhs = 5;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  ifTestTmp = tmpNestedAssignCompMemberRhs;
} while (ifTestTmp);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: "x"
 - 2: 1
 - 3: {"x":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[[0], ['x'], [1], [{ x: 5 }, 5, 3], null];

