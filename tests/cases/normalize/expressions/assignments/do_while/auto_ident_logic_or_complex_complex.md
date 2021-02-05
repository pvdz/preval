# Preval test case

# auto_ident_logic_or_complex_complex.md

> normalize > expressions > assignments > do_while > auto_ident_logic_or_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let a = { a: 999, b: 1000 };
do {
  $(100);
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
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
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
  }
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 2
 - 5: 2
 - 6: 100
 - 7: 0
 - 8: 0
 - 9: 2
 - 10: 2
 - 11: 100
 - 12: 0
 - 13: 0
 - 14: 2
 - 15: 2
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 2
 - 20: 2
 - 21: 100
 - 22: 0
 - 23: 0
 - 24: 2
 - 25: 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
