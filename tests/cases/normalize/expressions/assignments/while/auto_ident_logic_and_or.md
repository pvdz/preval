# Preval test case

# auto_ident_logic_and_or.md

> normalize > expressions > assignments > while > auto_ident_logic_and_or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = ($($(1)) && $($(1))) || $($(2)))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (a) {
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    a = tmpCallCallee$2(tmpCalleeParam$2);
  }
  let tmpIfTest = a;
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
  a = $(tmpCalleeParam);
  if (a) {
    const tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
  }
  if (a) {
  } else {
    const tmpCalleeParam$2 = $(2);
    a = $(tmpCalleeParam$2);
  }
  let tmpIfTest = a;
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
 - 5: 100
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same