# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1)) && $($(2)) && $($(1)) && $($(2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1)) && $($(2)) && $($(1)) && $($(2));
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
  const tmpCalleeParam$1 = $(2);
  tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpIfTest) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    tmpIfTest = tmpCallCallee$3(tmpCalleeParam$3);
    if (tmpIfTest) {
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = $(2);
      tmpCallCallee$5(tmpCalleeParam$5);
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(2);
  const SSA_tmpIfTest = $(tmpCalleeParam$1);
  if (SSA_tmpIfTest) {
    const tmpCalleeParam$3 = $(1);
    const SSA_tmpIfTest$1 = $(tmpCalleeParam$3);
    if (SSA_tmpIfTest$1) {
      const tmpCalleeParam$5 = $(2);
      $(tmpCalleeParam$5);
    }
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 2
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
