# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > For a > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (a = $($(0)) || $($(1)) || $($(2)); ; $(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  a = $($(0)) || $($(1)) || $($(2));
  while (true) {
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
a = tmpCallCallee(tmpCalleeParam);
if (a) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  a = tmpCallCallee$1(tmpCalleeParam$1);
  if (a) {
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    a = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
while (true) {
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(0);
let tmpSSA_a = $(tmpCalleeParam);
if (tmpSSA_a) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpSSA_a = $(tmpCalleeParam$1);
  if (tmpSSA_a) {
  } else {
    const tmpCalleeParam$3 = $(2);
    tmpSSA_a = $(tmpCalleeParam$3);
  }
}
while (true) {
  $(1);
}
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
