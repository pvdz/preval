# Preval test case

# auto_ident_bin.md

> normalize > expressions > assignments > do_while > auto_ident_bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(1) + $(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  const tmpBinBothLhs = $(1);
  const tmpBinBothRhs = $(2);
  const tmpNestedComplexRhs = tmpBinBothLhs + tmpBinBothRhs;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  const tmpBinBothLhs = $(1);
  const tmpBinBothRhs = $(2);
  const tmpNestedComplexRhs = tmpBinBothLhs + tmpBinBothRhs;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: 100
 - 8: 1
 - 9: 2
 - 10: 100
 - 11: 1
 - 12: 2
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: 100
 - 20: 1
 - 21: 2
 - 22: 100
 - 23: 1
 - 24: 2
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
