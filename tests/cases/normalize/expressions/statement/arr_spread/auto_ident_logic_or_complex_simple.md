# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...($($(0)) || 2)];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpArrElToSpread /*:unknown*/ = $(tmpCalleeParam);
if (tmpArrElToSpread) {
} else {
  tmpArrElToSpread = 2;
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
  tmpArrElToSpread = 2;
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
  b = 2;
}
[ ...b ];
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(0);
let tmpArrElToSpread = $(tmpCalleeParam);
if (tmpArrElToSpread) {
} else {
  tmpArrElToSpread = 2;
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
