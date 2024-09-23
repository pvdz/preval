# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Binary both > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && $($(1)) && $($(2))) + (a = $($(1)) && $($(1)) && $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && $($(1)) && $($(2))) + (a = $($(1)) && $($(1)) && $($(2))));
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
  if (a) {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(2);
    a = tmpCallCallee$5(tmpCalleeParam$5);
  } else {
  }
} else {
}
let tmpBinBothLhs = a;
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = $(1);
a = tmpCallCallee$7(tmpCalleeParam$7);
if (a) {
  const tmpCallCallee$9 = $;
  const tmpCalleeParam$9 = $(1);
  a = tmpCallCallee$9(tmpCalleeParam$9);
  if (a) {
    const tmpCallCallee$11 = $;
    const tmpCalleeParam$11 = $(2);
    a = tmpCallCallee$11(tmpCalleeParam$11);
  } else {
  }
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
if (a) {
  const tmpCalleeParam$3 = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
    const tmpCalleeParam$5 = $(2);
    a = $(tmpCalleeParam$5);
  } else {
  }
} else {
}
const tmpBinBothLhs = a;
const tmpCalleeParam$7 = $(1);
let tmpClusterSSA_a = $(tmpCalleeParam$7);
if (tmpClusterSSA_a) {
  const tmpCalleeParam$9 = $(1);
  tmpClusterSSA_a = $(tmpCalleeParam$9);
  if (tmpClusterSSA_a) {
    const tmpCalleeParam$11 = $(2);
    tmpClusterSSA_a = $(tmpCalleeParam$11);
  } else {
  }
} else {
}
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
const e = b;
const f = $( 1 );
let g = $( f );
if (g) {
  const h = $( 1 );
  g = $( h );
  if (g) {
    const i = $( 2 );
    g = $( i );
  }
}
const j = e + g;
$( j );
$( g );
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
 - 6: 2
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 2
 - 13: 4
 - 14: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
