# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > statement > do_while > auto_ident_logic_or_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(0)) || 2);
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
    const tmpCalleeParam = $(0);
    tmpIfTest = tmpCallCallee(tmpCalleeParam);
    if (tmpIfTest) {
    } else {
      tmpIfTest = 2;
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
    const tmpCalleeParam = $(0);
    tmpIfTest = $(tmpCalleeParam);
    if (tmpIfTest) {
    } else {
      tmpIfTest = 2;
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
 - 2: 0
 - 3: 0
 - 4: 100
 - 5: 0
 - 6: 0
 - 7: 100
 - 8: 0
 - 9: 0
 - 10: 100
 - 11: 0
 - 12: 0
 - 13: 100
 - 14: 0
 - 15: 0
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 100
 - 20: 0
 - 21: 0
 - 22: 100
 - 23: 0
 - 24: 0
 - 25: 100
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same