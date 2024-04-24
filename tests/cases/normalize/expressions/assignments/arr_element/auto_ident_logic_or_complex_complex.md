# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(2))) + (a = $($(0)) || $($(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(2))) + (a = $($(0)) || $($(2))));
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
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  a = tmpCallCallee$3(tmpCalleeParam$3);
}
let tmpBinBothLhs = a;
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = $(0);
a = tmpCallCallee$5(tmpCalleeParam$5);
if (a) {
} else {
  const tmpCallCallee$7 = $;
  const tmpCalleeParam$7 = $(2);
  a = tmpCallCallee$7(tmpCalleeParam$7);
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(0);
let a = $(tmpCalleeParam$1);
let tmpBinBothLhs = undefined;
if (a) {
  tmpBinBothLhs = a;
} else {
  const tmpCalleeParam$3 = $(2);
  a = $(tmpCalleeParam$3);
  tmpBinBothLhs = a;
}
const tmpCalleeParam$5 = $(0);
a = $(tmpCalleeParam$5);
let tmpCalleeParam = undefined;
if (a) {
  tmpCalleeParam = tmpBinBothLhs + a;
  $(tmpCalleeParam);
} else {
  const tmpCalleeParam$7 = $(2);
  a = $(tmpCalleeParam$7);
  tmpCalleeParam = tmpBinBothLhs + a;
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
let c = undefined;
if (b) {
  c = b;
}
else {
  const d = $( 2 );
  b = $( d );
  c = b;
}
const e = $( 0 );
b = $( e );
let f = undefined;
if (b) {
  f = c + b;
  $( f );
}
else {
  const g = $( 2 );
  b = $( g );
  f = c + b;
  $( f );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 0
 - 6: 0
 - 7: 2
 - 8: 2
 - 9: 4
 - 10: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
