# Preval test case

# auto_ident_logic_and_complex_complex.md

> normalize > expressions > statement > do_while > auto_ident_logic_and_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(1)) && $($(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    tmpIfTest = tmpCallCallee(tmpCalleeParam);
    if (tmpIfTest) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(2);
      tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    }
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    tmpIfTest = tmpCallCallee(tmpCalleeParam);
    if (tmpIfTest) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(2);
      tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    }
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - 6: 100
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 2
 - 11: 100
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: 2
 - 16: 100
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 2
 - 21: 100
 - 22: 1
 - 23: 1
 - 24: 2
 - 25: 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
