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
let tmpBinBothLhs;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(1);
  tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
}
if (tmpNestedComplexRhs) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
}
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpCallCallee$4 = $;
const tmpCalleeParam$4 = $(1);
let tmpNestedComplexRhs$1 = tmpCallCallee$4(tmpCalleeParam$4);
if (tmpNestedComplexRhs$1) {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = $(1);
  tmpNestedComplexRhs$1 = tmpCallCallee$5(tmpCalleeParam$5);
}
if (tmpNestedComplexRhs$1) {
} else {
  const tmpCallCallee$6 = $;
  const tmpCalleeParam$6 = $(2);
  tmpNestedComplexRhs$1 = tmpCallCallee$6(tmpCalleeParam$6);
}
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(1);
  tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
}
if (tmpNestedComplexRhs) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
}
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpCallCallee$4 = $;
const tmpCalleeParam$4 = $(1);
let tmpNestedComplexRhs$1 = tmpCallCallee$4(tmpCalleeParam$4);
if (tmpNestedComplexRhs$1) {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = $(1);
  tmpNestedComplexRhs$1 = tmpCallCallee$5(tmpCalleeParam$5);
}
if (tmpNestedComplexRhs$1) {
} else {
  const tmpCallCallee$6 = $;
  const tmpCalleeParam$6 = $(2);
  tmpNestedComplexRhs$1 = tmpCallCallee$6(tmpCalleeParam$6);
}
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
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
