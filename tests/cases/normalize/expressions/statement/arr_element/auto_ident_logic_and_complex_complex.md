# Preval test case

# auto_ident_logic_and_complex_complex.md

> normalize > expressions > statement > arr_element > auto_ident_logic_and_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(1)) && $($(2))) + ($($(1)) && $($(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpCallCallee$1(tmpCalleeParam$1);
}
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = $(1);
const tmpIfTest$1 = tmpCallCallee$2(tmpCalleeParam$2);
if (tmpIfTest$1) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpCallCallee$3(tmpCalleeParam$3);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpCallCallee$1(tmpCalleeParam$1);
}
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = $(1);
const tmpIfTest$1 = tmpCallCallee$2(tmpCalleeParam$2);
if (tmpIfTest$1) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpCallCallee$3(tmpCalleeParam$3);
}
$(a);
`````

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

Normalized calls: Same

Final output calls: Same
