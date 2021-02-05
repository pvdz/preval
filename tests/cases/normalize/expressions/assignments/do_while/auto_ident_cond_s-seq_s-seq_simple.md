# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> normalize > expressions > assignments > do_while > auto_ident_cond_s-seq_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (10, 20, 30) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let a = { a: 999, b: 1000 };
do {
  $(100);
  let tmpNestedComplexRhs = undefined;
  10;
  20;
  const tmpIfTest = 30;
  if (tmpIfTest) {
    40;
    50;
    tmpNestedComplexRhs = 60;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  }
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a);
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
let a = { a: 999, b: 1000 };
do {
  $(100);
  let tmpNestedComplexRhs = undefined;
  tmpNestedComplexRhs = 60;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: 100
 - 7: 100
 - 8: 100
 - 9: 100
 - 10: 100
 - 11: 100
 - 12: 100
 - 13: 100
 - 14: 100
 - 15: 100
 - 16: 100
 - 17: 100
 - 18: 100
 - 19: 100
 - 20: 100
 - 21: 100
 - 22: 100
 - 23: 100
 - 24: 100
 - 25: 100
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
