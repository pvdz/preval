# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Compound > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= ($($(1)) && $($(1))) || $($(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= ($($(1)) && $($(1))) || $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpBinBothRhs) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(1);
  tmpBinBothRhs = tmpCallCallee$3(tmpCalleeParam$3);
} else {
}
if (tmpBinBothRhs) {
} else {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = $(2);
  tmpBinBothRhs = tmpCallCallee$5(tmpCalleeParam$5);
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpCalleeParam$1 = $(1);
let tmpBinBothRhs = $(tmpCalleeParam$1);
if (tmpBinBothRhs) {
  const tmpCalleeParam$3 = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$3);
} else {
}
if (tmpBinBothRhs) {
} else {
  const tmpCalleeParam$5 = $(2);
  tmpBinBothRhs = $(tmpCalleeParam$5);
}
a = tmpBinBothLhs * tmpBinBothRhs;
$(a);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
const b = a;
const c = $( 1 );
let d = $( c );
if (d) {
  const e = $( 1 );
  d = $( e );
}
if (d) {

}
else {
  const f = $( 2 );
  d = $( f );
}
a = b * d;
$( a );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: NaN
 - 6: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
