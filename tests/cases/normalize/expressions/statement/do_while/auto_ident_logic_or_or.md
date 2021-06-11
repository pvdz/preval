# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Do while > Auto ident logic or or
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

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag || $($(0)) || $($(1)) || $($(2))) {
    tmpDoWhileFlag = false;
    {
      $(100);
    }
  }
}
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
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
      if (tmpIfTest) {
      } else {
        const tmpCallCallee$3 = $;
        const tmpCalleeParam$3 = $(2);
        tmpIfTest = tmpCallCallee$3(tmpCalleeParam$3);
      }
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
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpDoWhileFlag) {
  } else {
    const tmpCalleeParam = $(0);
    tmpIfTest = $(tmpCalleeParam);
    if (tmpIfTest) {
    } else {
      const tmpCalleeParam$1 = $(1);
      tmpIfTest = $(tmpCalleeParam$1);
      if (tmpIfTest) {
      } else {
        const tmpCalleeParam$3 = $(2);
        tmpIfTest = $(tmpCalleeParam$3);
      }
    }
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
