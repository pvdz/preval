# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident logic and simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 && $($(1))) + (a = 1 && $($(1))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 && $($(1))) + (a = 1 && $($(1))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 1;
if (a) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  a = tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
let tmpBinBothLhs = a;
a = 1;
if (a) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(1);
  a = tmpCallCallee$3(tmpCalleeParam$3);
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
const tmpSSA_a$2 = $(tmpCalleeParam$1);
const tmpCalleeParam$3 = $(1);
const tmpSSA_a$4 = $(tmpCalleeParam$3);
const tmpCalleeParam = tmpSSA_a$2 + tmpSSA_a$4;
$(tmpCalleeParam);
$(tmpSSA_a$4);
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
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
