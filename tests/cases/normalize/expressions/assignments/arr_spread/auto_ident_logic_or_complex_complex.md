# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = $($(0)) || $($(2)))]);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpArrSpread /*:unknown*/ = undefined;
if (a) {
  tmpArrSpread = a;
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$3);
  tmpArrSpread = a;
}
const tmpCalleeParam /*:array*/ = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
let tmpArrSpread = undefined;
if (a) {
  tmpArrSpread = a;
} else {
  a = $($(2));
  tmpArrSpread = a;
}
$([...tmpArrSpread]);
$(a);
`````


## PST Settled
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
const e = [ ...c ];
$( e );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
