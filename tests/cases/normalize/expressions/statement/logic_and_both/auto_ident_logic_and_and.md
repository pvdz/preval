# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Logic and both > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1)) && $($(1)) && $($(2)) && $($(1)) && $($(1)) && $($(2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1)) && $($(1)) && $($(2)) && $($(1)) && $($(1)) && $($(2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpIfTest) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpIfTest = tmpCallCallee$3(tmpCalleeParam$3);
    if (tmpIfTest) {
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = $(1);
      tmpIfTest = tmpCallCallee$5(tmpCalleeParam$5);
      if (tmpIfTest) {
        const tmpCallCallee$7 = $;
        const tmpCalleeParam$7 = $(1);
        tmpIfTest = tmpCallCallee$7(tmpCalleeParam$7);
        if (tmpIfTest) {
          const tmpCallCallee$9 = $;
          const tmpCalleeParam$9 = $(2);
          tmpCallCallee$9(tmpCalleeParam$9);
        } else {
        }
      } else {
      }
    } else {
    }
  } else {
  }
} else {
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(1);
  const tmpSSA_tmpIfTest = $(tmpCalleeParam$1);
  if (tmpSSA_tmpIfTest) {
    const tmpCalleeParam$3 = $(2);
    const tmpSSA_tmpIfTest$1 = $(tmpCalleeParam$3);
    if (tmpSSA_tmpIfTest$1) {
      const tmpCalleeParam$5 = $(1);
      const tmpSSA_tmpIfTest$3 = $(tmpCalleeParam$5);
      if (tmpSSA_tmpIfTest$3) {
        const tmpCalleeParam$7 = $(1);
        const tmpSSA_tmpIfTest$5 = $(tmpCalleeParam$7);
        if (tmpSSA_tmpIfTest$5) {
          const tmpCalleeParam$9 = $(2);
          $(tmpCalleeParam$9);
        } else {
        }
      } else {
      }
    } else {
    }
  } else {
  }
} else {
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 2
 - 13: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
