# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Logic and both > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || $($(1)) || $($(2))) && ($($(0)) || $($(1)) || $($(2)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || $($(1)) || $($(2))) && ($($(0)) || $($(1)) || $($(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
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
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpIfTest = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
if (tmpIfTest) {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = $(0);
  let tmpIfTest$1 = tmpCallCallee$5(tmpCalleeParam$5);
  if (tmpIfTest$1) {
  } else {
    const tmpCallCallee$7 = $;
    const tmpCalleeParam$7 = $(1);
    tmpIfTest$1 = tmpCallCallee$7(tmpCalleeParam$7);
    if (tmpIfTest$1) {
    } else {
      const tmpCallCallee$9 = $;
      const tmpCalleeParam$9 = $(2);
      tmpCallCallee$9(tmpCalleeParam$9);
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpIfTest = $(tmpCalleeParam);
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
if (tmpIfTest) {
  const tmpCalleeParam$5 = $(0);
  const tmpIfTest$1 = $(tmpCalleeParam$5);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$7 = $(1);
    const SSA_tmpIfTest$1 = $(tmpCalleeParam$7);
    if (SSA_tmpIfTest$1) {
    } else {
      const tmpCalleeParam$9 = $(2);
      $(tmpCalleeParam$9);
    }
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
 - 5: 0
 - 6: 0
 - 7: 1
 - 8: 1
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
