# Preval test case

# auto_ident_logic_or_or.md

> normalize > expressions > statement > binary_both > auto_ident_logic_or_or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || $($(1)) || $($(2))) + ($($(0)) || $($(1)) || $($(2)));
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
}
if (tmpIfTest) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpCallCallee$2(tmpCalleeParam$2);
}
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = $(0);
let tmpIfTest$1 = tmpCallCallee$3(tmpCalleeParam$3);
if (tmpIfTest$1) {
} else {
  const tmpCallCallee$4 = $;
  const tmpCalleeParam$4 = $(1);
  tmpIfTest$1 = tmpCallCallee$4(tmpCalleeParam$4);
}
if (tmpIfTest$1) {
} else {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = $(2);
  tmpCallCallee$5(tmpCalleeParam$5);
}
$(a);
`````

## Output

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
}
if (tmpIfTest) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpCallCallee$2(tmpCalleeParam$2);
}
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = $(0);
let tmpIfTest$1 = tmpCallCallee$3(tmpCalleeParam$3);
if (tmpIfTest$1) {
} else {
  const tmpCallCallee$4 = $;
  const tmpCalleeParam$4 = $(1);
  tmpIfTest$1 = tmpCallCallee$4(tmpCalleeParam$4);
}
if (tmpIfTest$1) {
} else {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = $(2);
  tmpCallCallee$5(tmpCalleeParam$5);
}
$(a);
`````

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

Normalized calls: Same

Final output calls: Same
