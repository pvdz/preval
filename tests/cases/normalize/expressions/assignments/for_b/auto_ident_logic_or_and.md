# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > For b > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $($(0)) || ($($(1)) && $($(2)))); $(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = $($(0)) || ($($(1)) && $($(2))))) {
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
    if (a) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      a = tmpCallCallee$2(tmpCalleeParam$2);
    }
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
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
  const tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      const tmpCalleeParam$2 = $(2);
      a = $(tmpCalleeParam$2);
    }
  }
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
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
 - 5: 2
 - 6: 2
 - 7: 1
 - 8: 0
 - 9: 0
 - 10: 1
 - 11: 1
 - 12: 2
 - 13: 2
 - 14: 1
 - 15: 0
 - 16: 0
 - 17: 1
 - 18: 1
 - 19: 2
 - 20: 2
 - 21: 1
 - 22: 0
 - 23: 0
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
