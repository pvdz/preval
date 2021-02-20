# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && $($(2))) + (a = $($(1)) && $($(2))));
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
  const tmpCalleeParam$2 = $(2);
  a = tmpCallCallee$2(tmpCalleeParam$2);
}
let tmpBinBothLhs = a;
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = $(1);
a = tmpCallCallee$3(tmpCalleeParam$3);
if (a) {
  const tmpCallCallee$4 = $;
  const tmpCalleeParam$4 = $(2);
  a = tmpCallCallee$4(tmpCalleeParam$4);
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
let SSA_a = $(tmpCalleeParam$1);
if (SSA_a) {
  const tmpCalleeParam$2 = $(2);
  SSA_a = $(tmpCalleeParam$2);
}
const tmpBinBothLhs = SSA_a;
const tmpCalleeParam$3 = $(1);
let SSA_a$1 = $(tmpCalleeParam$3);
if (SSA_a$1) {
  const tmpCalleeParam$4 = $(2);
  SSA_a$1 = $(tmpCalleeParam$4);
}
const tmpBinBothRhs = SSA_a$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(SSA_a$1);
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
 - 9: 4
 - 10: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
