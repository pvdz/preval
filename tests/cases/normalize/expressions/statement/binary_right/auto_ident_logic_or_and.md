# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > statement > binary_right > auto_ident_logic_or_and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + ($($(0)) || ($($(1)) && $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
const tmpIfTest = tmpCallCallee(tmpCalleeParam);
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
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
const tmpCalleeParam = $(0);
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 = $(1);
  const tmpIfTest$1 = $(tmpCalleeParam$1);
  if (tmpIfTest$1) {
    const tmpCalleeParam$2 = $(2);
    $(tmpCalleeParam$2);
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same