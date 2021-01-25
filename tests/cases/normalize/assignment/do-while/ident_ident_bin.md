# Preval test case

# ident_ident_bin.md

> normalize > assignment > do-while > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
let n = 0;
do { if ($(n++)) break; } while (a = b = c + d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpDoWhileTest;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
var tmpPostfixArg;
let a = 1;
let b = 2;
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
  tmpNestedComplexRhs$1 = c + d;
  b = tmpNestedComplexRhs$1;
  tmpNestedComplexRhs = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpDoWhileTest;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
var tmpPostfixArg;
let a = 1;
let b = 2;
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  const tmpIfTest = $(tmpArg);
  if (tmpIfTest) {
    break;
  }
  tmpNestedComplexRhs$1 = 7;
  b = tmpNestedComplexRhs$1;
  tmpNestedComplexRhs = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: 1
 - 2: 7,7,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[0], [1], [7, 7, 7], null];

