# Preval test case

# member_simple_simple.md

> normalize > assignment > do-while > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let n = 0;
do { if ($(n++)) break; } while (a.x = b);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpNestedPropAssignRhs;
var tmpPostfixArg;
let a = { x: 10 };
let b = 2;
let c = 3;
let n = 0;
do {
  {
    tmpPostfixArg = n;
    n = n + 1;
    tmpArg = tmpPostfixArg;
    let ifTestTmp$1 = $(tmpArg);
    if (ifTestTmp$1) {
      break;
    }
  }
  tmpNestedPropAssignRhs = b;
  a.x = tmpNestedPropAssignRhs;
  ifTestTmp = tmpNestedPropAssignRhs;
} while (ifTestTmp);
$(a, b, c);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpNestedPropAssignRhs;
var tmpPostfixArg;
let a = { x: 10 };
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  let ifTestTmp$1 = $(tmpArg);
  if (ifTestTmp$1) {
    break;
  }
  tmpNestedPropAssignRhs = 2;
  a.x = tmpNestedPropAssignRhs;
  ifTestTmp = tmpNestedPropAssignRhs;
} while (ifTestTmp);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: 1
 - 2: {"x":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
