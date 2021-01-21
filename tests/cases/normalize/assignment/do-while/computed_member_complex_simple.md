# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > do-while > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let n = 0;
do { if ($(n++)) break; } while ($(a)[$('x')] = b);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = { x: 10 };
let b = 2;
let c = 3;
let n = 0;
do {
  {
    tmpPostfixArg = n;
    n = n + 1;
    tmpArg = tmpPostfixArg;
    let ifTestTmp_1 = $(tmpArg);
    if (ifTestTmp_1) {
      break;
    }
  }
  tmpNestedAssignComMemberObj = $(a);
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = b;
  ifTestTmp = b;
} while (ifTestTmp);
$(a, b, c);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = { x: 10 };
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  let ifTestTmp_1 = $(tmpArg);
  if (ifTestTmp_1) {
    break;
  }
  tmpNestedAssignComMemberObj = $(a);
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 2;
  ifTestTmp = 2;
} while (ifTestTmp);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: {"x":10}
 - 2: "x"
 - 3: <crash[ Cannot set property 'undefined' of undefined ]>

Normalized calls: Same

Final output calls: Same
