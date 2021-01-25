# Preval test case

# ident_bin.md

> normalize > assignment > do-while > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let n = 0;
do { if ($(n++)) break; } while (a = b + c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpDoWhileTest;
var tmpNestedComplexRhs;
var tmpPostfixArg;
let a = 1;
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
  tmpNestedComplexRhs = b + c;
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
var tmpPostfixArg;
let a = 1;
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  const tmpIfTest = $(tmpArg);
  if (tmpIfTest) {
    break;
  }
  tmpNestedComplexRhs = 5;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: 1
 - 2: 5,2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[0], [1], [5, 5, 3], null];

