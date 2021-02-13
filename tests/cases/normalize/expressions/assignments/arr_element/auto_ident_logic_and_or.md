# Preval test case

# auto_ident_logic_and_or.md

> normalize > expressions > assignments > arr_element > auto_ident_logic_and_or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = ($($(1)) && $($(1))) || $($(2))) + (a = ($($(1)) && $($(1))) || $($(2)))
);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
a = tmpCallCallee$1(tmpCalleeParam$1);
if (a) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(1);
  a = tmpCallCallee$2(tmpCalleeParam$2);
}
if (a) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  a = tmpCallCallee$3(tmpCalleeParam$3);
}
let tmpBinBothLhs = a;
const tmpCallCallee$4 = $;
const tmpCalleeParam$4 = $(1);
a = tmpCallCallee$4(tmpCalleeParam$4);
if (a) {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = $(1);
  a = tmpCallCallee$5(tmpCalleeParam$5);
}
if (a) {
} else {
  const tmpCallCallee$6 = $;
  const tmpCalleeParam$6 = $(2);
  a = tmpCallCallee$6(tmpCalleeParam$6);
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(1);
a = $(tmpCalleeParam$1);
if (a) {
  const tmpCalleeParam$2 = $(1);
  a = $(tmpCalleeParam$2);
}
if (a) {
} else {
  const tmpCalleeParam$3 = $(2);
  a = $(tmpCalleeParam$3);
}
let tmpBinBothLhs = a;
const tmpCalleeParam$4 = $(1);
a = $(tmpCalleeParam$4);
if (a) {
  const tmpCalleeParam$5 = $(1);
  a = $(tmpCalleeParam$5);
}
if (a) {
} else {
  const tmpCalleeParam$6 = $(2);
  a = $(tmpCalleeParam$6);
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same