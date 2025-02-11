# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Binary both > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = $($(0)) || ($($(1)) && $($(2)))) + (a = $($(0)) || ($($(1)) && $($(2))))
);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || ($($(1)) && $($(2)))) + (a = $($(0)) || ($($(1)) && $($(2)))));
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
  const tmpCalleeParam$3 = $(1);
  a = tmpCallCallee$3(tmpCalleeParam$3);
  if (a) {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(2);
    a = tmpCallCallee$5(tmpCalleeParam$5);
  } else {
  }
}
let tmpBinBothLhs = a;
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = $(0);
a = tmpCallCallee$7(tmpCalleeParam$7);
if (a) {
} else {
  const tmpCallCallee$9 = $;
  const tmpCalleeParam$9 = $(1);
  a = tmpCallCallee$9(tmpCalleeParam$9);
  if (a) {
    const tmpCallCallee$11 = $;
    const tmpCalleeParam$11 = $(2);
    a = tmpCallCallee$11(tmpCalleeParam$11);
  } else {
  }
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
if (a) {
} else {
  const tmpCalleeParam$3 = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
    const tmpCalleeParam$5 = $(2);
    a = $(tmpCalleeParam$5);
  } else {
  }
}
const tmpBinBothLhs = a;
const tmpCalleeParam$7 = $(0);
let tmpClusterSSA_a = $(tmpCalleeParam$7);
if (tmpClusterSSA_a) {
} else {
  const tmpCalleeParam$9 = $(1);
  tmpClusterSSA_a = $(tmpCalleeParam$9);
  if (tmpClusterSSA_a) {
    const tmpCalleeParam$11 = $(2);
    tmpClusterSSA_a = $(tmpCalleeParam$11);
  } else {
  }
}
const tmpBinBothRhs = tmpClusterSSA_a;
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
const e = b;
const f = $( 0 );
let g = $( f );
if (g) {

}
else {
  const h = $( 1 );
  g = $( h );
  if (g) {
    const i = $( 2 );
    g = $( i );
  }
}
const j = g;
const k = e + j;
$( k );
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 0
 - 8: 0
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
