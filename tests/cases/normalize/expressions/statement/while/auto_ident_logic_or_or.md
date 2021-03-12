# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > While > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(0)) || $($(1)) || $($(2))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(0)) || $($(1)) || $($(2))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest) {
    } else {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      tmpIfTest = tmpCallCallee$2(tmpCalleeParam$2);
    }
  }
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
while (true) {
  const tmpCalleeParam = $(0);
  let tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = $(tmpCalleeParam$1);
    if (tmpIfTest) {
    } else {
      const tmpCalleeParam$2 = $(2);
      tmpIfTest = $(tmpCalleeParam$2);
    }
  }
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: 0
 - 7: 0
 - 8: 1
 - 9: 1
 - 10: 100
 - 11: 0
 - 12: 0
 - 13: 1
 - 14: 1
 - 15: 100
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 1
 - 20: 100
 - 21: 0
 - 22: 0
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
