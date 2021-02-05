# Preval test case

# auto_ident_logic_and_and.md

> normalize > expressions > statement > do_while > auto_ident_logic_and_and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(1)) && $($(1)) && $($(2)));
$(a);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let a = { a: 999, b: 1000 };
do {
  $(100);
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpDoWhileTest = tmpCallCallee(tmpCalleeParam);
  if (tmpDoWhileTest) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpDoWhileTest = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (tmpDoWhileTest) {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpDoWhileTest = tmpCallCallee$2(tmpCalleeParam$2);
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
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpDoWhileTest = tmpCallCallee(tmpCalleeParam);
  if (tmpDoWhileTest) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpDoWhileTest = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (tmpDoWhileTest) {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpDoWhileTest = tmpCallCallee$2(tmpCalleeParam$2);
  }
} while (tmpDoWhileTest);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: 100
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: 2
 - 15: 100
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 2
 - 22: 100
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
