# Preval test case

# auto_ident_logic_and_and.md

> normalize > expressions > statement > arr_element > auto_ident_logic_and_and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(1)) && $($(1)) && $($(2))) + ($($(1)) && $($(1)) && $($(2)));
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
}
if (tmpIfTest) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpCallCallee$2(tmpCalleeParam$2);
}
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = $(1);
let tmpIfTest$1 = tmpCallCallee$3(tmpCalleeParam$3);
if (tmpIfTest$1) {
  const tmpCallCallee$4 = $;
  const tmpCalleeParam$4 = $(1);
  tmpIfTest$1 = tmpCallCallee$4(tmpCalleeParam$4);
}
if (tmpIfTest$1) {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = $(2);
  tmpCallCallee$5(tmpCalleeParam$5);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
}
if (tmpIfTest) {
  const tmpCalleeParam$2 = $(2);
  $(tmpCalleeParam$2);
}
const tmpCalleeParam$3 = $(1);
let tmpIfTest$1 = $(tmpCalleeParam$3);
if (tmpIfTest$1) {
  const tmpCalleeParam$4 = $(1);
  tmpIfTest$1 = $(tmpCalleeParam$4);
}
if (tmpIfTest$1) {
  const tmpCalleeParam$5 = $(2);
  $(tmpCalleeParam$5);
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

Normalized calls: Same

Final output calls: Same
