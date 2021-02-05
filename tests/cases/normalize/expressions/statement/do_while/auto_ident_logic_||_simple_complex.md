# Preval test case

# auto_ident_logic_||_simple_complex.md

> normalize > expressions > statement > do_while > auto_ident_logic_||_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while (0 || $($(1)));
$(a);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let a = { a: 999, b: 1000 };
do {
  $(100);
  tmpDoWhileTest = 0;
  if (tmpDoWhileTest) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    tmpDoWhileTest = tmpCallCallee(tmpCalleeParam);
  }
} while (tmpDoWhileTest);
$(a);
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
let a = { a: 999, b: 1000 };
do {
  $(100);
  tmpDoWhileTest = 0;
  if (tmpDoWhileTest) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    tmpDoWhileTest = tmpCallCallee(tmpCalleeParam);
  }
} while (tmpDoWhileTest);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
