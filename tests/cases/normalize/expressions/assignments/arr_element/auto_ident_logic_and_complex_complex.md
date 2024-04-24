# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && $($(2))) + (a = $($(1)) && $($(2))));
$(a);
`````

## Pre Normal

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
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  a = tmpCallCallee$3(tmpCalleeParam$3);
} else {
}
let tmpBinBothLhs = a;
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = $(1);
a = tmpCallCallee$5(tmpCalleeParam$5);
if (a) {
  const tmpCallCallee$7 = $;
  const tmpCalleeParam$7 = $(2);
  a = tmpCallCallee$7(tmpCalleeParam$7);
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
let a = $(tmpCalleeParam$1);
let tmpBinBothLhs = undefined;
if (a) {
  const tmpCalleeParam$3 = $(2);
  a = $(tmpCalleeParam$3);
  tmpBinBothLhs = a;
} else {
  tmpBinBothLhs = a;
}
const tmpCalleeParam$5 = $(1);
a = $(tmpCalleeParam$5);
let tmpCalleeParam = undefined;
if (a) {
  const tmpCalleeParam$7 = $(2);
  a = $(tmpCalleeParam$7);
  tmpCalleeParam = tmpBinBothLhs + a;
  $(tmpCalleeParam);
} else {
  tmpCalleeParam = tmpBinBothLhs + a;
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
let c = undefined;
if (b) {
  const d = $( 2 );
  b = $( d );
  c = b;
}
else {
  c = b;
}
const e = $( 1 );
b = $( e );
let f = undefined;
if (b) {
  const g = $( 2 );
  b = $( g );
  f = c + b;
  $( f );
}
else {
  f = c + b;
  $( f );
}
$( b );
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
