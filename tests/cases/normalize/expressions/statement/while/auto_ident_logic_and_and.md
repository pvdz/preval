# Preval test case

# auto_ident_logic_and_and.md

> normalize > expressions > statement > while > auto_ident_logic_and_and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(1)) && $($(1)) && $($(2))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (tmpIfTest) {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpIfTest = tmpCallCallee$2(tmpCalleeParam$2);
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
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCalleeParam = $(1);
  let tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = $(tmpCalleeParam$1);
  }
  if (tmpIfTest) {
    const tmpCalleeParam$2 = $(2);
    tmpIfTest = $(tmpCalleeParam$2);
  }
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 100
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 2
 - 13: 2
 - 14: 100
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 2
 - 21: 100
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same