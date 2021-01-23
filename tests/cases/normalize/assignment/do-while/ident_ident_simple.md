# Preval test case

# ident_ident_simple.md

> normalize > assignment > do-while > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let n = 0;
do { if ($(n++)) break; } while (a = b = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpNestedComplexRhs;
var tmpPostfixArg;
let a = 1;
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
  b = c;
  tmpNestedComplexRhs = c;
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
var tmpPostfixArg;
let a = 1;
let b = 2;
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  let ifTestTmp$1 = $(tmpArg);
  if (ifTestTmp$1) {
    break;
  }
  b = 3;
  tmpNestedComplexRhs = 3;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: 1
 - 2: 3,3,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
