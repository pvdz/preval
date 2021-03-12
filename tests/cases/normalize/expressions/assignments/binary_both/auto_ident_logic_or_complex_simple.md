# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || 2) + (a = $($(0)) || 2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || 2) + (a = $($(0)) || 2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
a = tmpCallCallee$1(tmpCalleeParam$1);
if (a) {
} else {
  a = 2;
}
let tmpBinBothLhs = a;
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = $(0);
a = tmpCallCallee$2(tmpCalleeParam$2);
if (a) {
} else {
  a = 2;
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(0);
let SSA_a = $(tmpCalleeParam$1);
if (SSA_a) {
} else {
  SSA_a = 2;
}
const tmpBinBothLhs = SSA_a;
const tmpCalleeParam$2 = $(0);
let SSA_a$1 = $(tmpCalleeParam$2);
if (SSA_a$1) {
} else {
  SSA_a$1 = 2;
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
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: 4
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
