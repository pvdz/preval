# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Arr spread > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...(($($(1)) && $($(1))) || $($(2)))];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpArrElToSpread /*:unknown*/ = $(tmpCalleeParam);
if (tmpArrElToSpread) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpArrElToSpread = $(tmpCalleeParam$1);
} else {
}
if (tmpArrElToSpread) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  tmpArrElToSpread = $(tmpCalleeParam$3);
}
[...tmpArrElToSpread];
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpArrElToSpread = $($(1));
if (tmpArrElToSpread) {
  tmpArrElToSpread = $($(1));
}
if (!tmpArrElToSpread) {
  tmpArrElToSpread = $($(2));
}
[...tmpArrElToSpread];
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {

}
else {
  const d = $( 2 );
  b = $( d );
}
[ ...b ];
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(1);
let tmpArrElToSpread = $(tmpCalleeParam);
if (tmpArrElToSpread) {
  let tmpCalleeParam$1 = $(1);
  tmpArrElToSpread = $(tmpCalleeParam$1);
} else {
}
if (tmpArrElToSpread) {
} else {
  let tmpCalleeParam$3 = $(2);
  tmpArrElToSpread = $(tmpCalleeParam$3);
}
[...tmpArrElToSpread];
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
