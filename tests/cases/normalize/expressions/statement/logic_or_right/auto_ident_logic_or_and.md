# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Logic or right > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) || $($(0)) || ($($(1)) && $($(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    const tmpIfTest$1 = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest$1) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      tmpCallCallee$2(tmpCalleeParam$2);
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(0);
  const SSA_tmpIfTest = $(tmpCalleeParam);
  if (SSA_tmpIfTest) {
  } else {
    const tmpCalleeParam$1 = $(1);
    const tmpIfTest$1 = $(tmpCalleeParam$1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$2 = $(2);
      $(tmpCalleeParam$2);
    }
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
