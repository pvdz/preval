# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Arr spread > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...($($(0)) || ($($(1)) && $($(2))))];
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpArrElToSpread /*:unknown*/ = $(tmpCalleeParam);
if (tmpArrElToSpread) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpArrElToSpread = $(tmpCalleeParam$1);
  if (tmpArrElToSpread) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    tmpArrElToSpread = $(tmpCalleeParam$3);
  } else {
  }
}
[...tmpArrElToSpread];
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpArrElToSpread = $($(0));
if (!tmpArrElToSpread) {
  tmpArrElToSpread = $($(1));
  if (tmpArrElToSpread) {
    tmpArrElToSpread = $($(2));
  }
}
[...tmpArrElToSpread];
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
[...($($(0)) || ($($(1)) && $($(2))))];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpArrElToSpread = $(tmpCalleeParam);
if (tmpArrElToSpread) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpArrElToSpread = $(tmpCalleeParam$1);
  if (tmpArrElToSpread) {
    const tmpCalleeParam$3 = $(2);
    tmpArrElToSpread = $(tmpCalleeParam$3);
  } else {
  }
}
[...tmpArrElToSpread];
$(a);
`````

## PST Settled
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
[ ...b ];
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
