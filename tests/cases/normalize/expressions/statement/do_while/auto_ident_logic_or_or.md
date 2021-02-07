# Preval test case

# auto_ident_logic_or_or.md

> normalize > expressions > statement > do_while > auto_ident_logic_or_or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(0)) || $($(1)) || $($(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  tmpDoWhileTest = tmpCallCallee(tmpCalleeParam);
  if (tmpDoWhileTest) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpDoWhileTest = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (tmpDoWhileTest) {
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpDoWhileTest = tmpCallCallee$2(tmpCalleeParam$2);
  }
} while (tmpDoWhileTest);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  tmpDoWhileTest = tmpCallCallee(tmpCalleeParam);
  if (tmpDoWhileTest) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpDoWhileTest = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (tmpDoWhileTest) {
  } else {
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
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 100
 - 7: 0
 - 8: 0
 - 9: 1
 - 10: 1
 - 11: 100
 - 12: 0
 - 13: 0
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: 0
 - 23: 0
 - 24: 1
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
