# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Arr element > Auto ident logic and or
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

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = ($($(1)) && $($(1))) || $($(2))) + (a = ($($(1)) && $($(1))) || $($(2))));
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
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(1);
  a = tmpCallCallee$3(tmpCalleeParam$3);
} else {
}
if (a) {
} else {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = $(2);
  a = tmpCallCallee$5(tmpCalleeParam$5);
}
let tmpBinBothLhs = a;
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = $(1);
a = tmpCallCallee$7(tmpCalleeParam$7);
if (a) {
  const tmpCallCallee$9 = $;
  const tmpCalleeParam$9 = $(1);
  a = tmpCallCallee$9(tmpCalleeParam$9);
} else {
}
if (a) {
} else {
  const tmpCallCallee$11 = $;
  const tmpCalleeParam$11 = $(2);
  a = tmpCallCallee$11(tmpCalleeParam$11);
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
let tmpSSA_a = $(tmpCalleeParam$1);
if (tmpSSA_a) {
  const tmpCalleeParam$3 = $(1);
  tmpSSA_a = $(tmpCalleeParam$3);
} else {
}
if (tmpSSA_a) {
} else {
  const tmpCalleeParam$5 = $(2);
  tmpSSA_a = $(tmpCalleeParam$5);
}
const tmpBinBothLhs = tmpSSA_a;
const tmpCalleeParam$7 = $(1);
let tmpSSA_a$1 = $(tmpCalleeParam$7);
if (tmpSSA_a$1) {
  const tmpCalleeParam$9 = $(1);
  tmpSSA_a$1 = $(tmpCalleeParam$9);
} else {
}
if (tmpSSA_a$1) {
} else {
  const tmpCalleeParam$11 = $(2);
  tmpSSA_a$1 = $(tmpCalleeParam$11);
}
const tmpBinBothRhs = tmpSSA_a$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(tmpSSA_a$1);
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
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
