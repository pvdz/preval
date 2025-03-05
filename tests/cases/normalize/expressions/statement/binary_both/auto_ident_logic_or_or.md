# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Binary both > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || $($(1)) || $($(2))) + ($($(0)) || $($(1)) || $($(2)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || $($(1)) || $($(2))) + ($($(0)) || $($(1)) || $($(2)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpBinBothLhs = $(tmpCalleeParam);
if (tmpBinBothLhs) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpBinBothLhs = $(tmpCalleeParam$1);
  if (tmpBinBothLhs) {
  } else {
    const tmpCalleeParam$3 = $(2);
    tmpBinBothLhs = $(tmpCalleeParam$3);
  }
}
const tmpCalleeParam$5 = $(0);
let tmpBinBothRhs = $(tmpCalleeParam$5);
if (tmpBinBothRhs) {
} else {
  const tmpCalleeParam$7 = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$7);
  if (tmpBinBothRhs) {
  } else {
    const tmpCalleeParam$9 = $(2);
    tmpBinBothRhs = $(tmpCalleeParam$9);
  }
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpBinBothLhs /*:unknown*/ = $(tmpCalleeParam);
if (tmpBinBothLhs) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpBinBothLhs = $(tmpCalleeParam$1);
  if (tmpBinBothLhs) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    tmpBinBothLhs = $(tmpCalleeParam$3);
  }
}
const tmpCalleeParam$5 /*:unknown*/ = $(0);
let tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$5);
if (tmpBinBothRhs) {
} else {
  const tmpCalleeParam$7 /*:unknown*/ = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$7);
  if (tmpBinBothRhs) {
  } else {
    const tmpCalleeParam$9 /*:unknown*/ = $(2);
    tmpBinBothRhs = $(tmpCalleeParam$9);
  }
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
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

  }
  else {
    const d = $( 2 );
    b = $( d );
  }
}
const e = $( 0 );
let f = $( e );
if (f) {

}
else {
  const g = $( 1 );
  f = $( g );
  if (f) {

  }
  else {
    const h = $( 2 );
    f = $( h );
  }
}
b + f;
const i = {
  a: 999,
  b: 1000,
};
$( i );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 0
 - 6: 0
 - 7: 1
 - 8: 1
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
