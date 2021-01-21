# Preval test case

# member_complex_simple.md

> normalize > assignment > do-while > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let n = 0;
do { if ($(n++)) break; } while ($(a).x = b);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedAssignObj;
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
  tmpNestedAssignObj = $(a);
  tmpNestedAssignObj.x = b;
  ifTestTmp = b;
} while (ifTestTmp);
$(a, b, c);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedAssignObj;
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
  tmpNestedAssignObj = $(a);
  tmpNestedAssignObj.x = 2;
  ifTestTmp = 2;
} while (ifTestTmp);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: {"x":10}
 - 2: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
