# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Arr spread > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...($($(0)) || $($(2)))];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpArrElToSpread /*:unknown*/ = $(tmpCalleeParam);
if (tmpArrElToSpread) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  tmpArrElToSpread = $(tmpCalleeParam$1);
}
[...tmpArrElToSpread];
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpArrElToSpread = $($(0));
if (!tmpArrElToSpread) {
  tmpArrElToSpread = $($(2));
}
[...tmpArrElToSpread];
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 2 );
  b = $( c );
}
[ ...b ];
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(0);
let tmpArrElToSpread = $(tmpCalleeParam);
if (tmpArrElToSpread) {
} else {
  let tmpCalleeParam$1 = $(2);
  tmpArrElToSpread = $(tmpCalleeParam$1);
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
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
