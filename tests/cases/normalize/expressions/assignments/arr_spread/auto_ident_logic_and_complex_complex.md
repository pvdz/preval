# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = $($(1)) && $($(2)))]);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpArrSpread /*:unknown*/ /*ternaryConst*/ = undefined;
if (a) {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$3);
  tmpArrSpread = a;
} else {
  tmpArrSpread = a;
}
const tmpCalleeParam /*:array*/ = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
let tmpArrSpread = undefined;
if (a) {
  a = $($(2));
  tmpArrSpread = a;
} else {
  tmpArrSpread = a;
}
$([...tmpArrSpread]);
$(a);
`````


## PST Settled
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
const e = [ ...c ];
$( e );
$( b );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
