# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Switch default > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    ($($(1)) && $($(1))) || $($(2));
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpIfTest$1 = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest$1 = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (tmpIfTest$1) {
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpCallCallee$2(tmpCalleeParam$2);
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(1);
const tmpCalleeParam = $(1);
let tmpIfTest$1 = $(tmpCalleeParam);
if (tmpIfTest$1) {
  const tmpCalleeParam$1 = $(1);
  tmpIfTest$1 = $(tmpCalleeParam$1);
}
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam$2 = $(2);
  $(tmpCalleeParam$2);
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
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
