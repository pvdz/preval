# Preval test case

# ident_spread.md

> Normalize > Object > Dupe props > Ident spread
>
> Duplicate properties are legal but useless. We should get rid of them.

## Input

`````js filename=intro
const x = {a: $('prop'), ...$({})};
$(x);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(`prop`);
const tmpCalleeParam /*:object*/ /*truthy*/ = {};
const tmpObjSpread /*:unknown*/ = $(tmpCalleeParam);
const x /*:object*/ /*truthy*/ = { a: tmpObjLitVal, ...tmpObjSpread };
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(`prop`);
const tmpObjSpread = $({});
$({ a: tmpObjLitVal, ...tmpObjSpread });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "prop" );
const b = {};
const c = $( b );
const d = {
  a: a,
  ... c,
};
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(`prop`);
let tmpCalleeParam = {};
const tmpObjSpread = $(tmpCalleeParam);
const x = { a: tmpObjLitVal, ...tmpObjSpread };
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'prop'
 - 2: {}
 - 3: { a: '"prop"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
