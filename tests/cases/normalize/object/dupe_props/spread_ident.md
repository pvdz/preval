# Preval test case

# spread_ident.md

> Normalize > Object > Dupe props > Spread ident
>
> Duplicate properties are legal but useless. We should get rid of them.

## Input

`````js filename=intro
const x = {...$({a: 'ignored'}), a: $('prop')};
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: `ignored` };
const tmpObjSpread /*:unknown*/ = $(tmpCalleeParam);
const tmpObjLitVal /*:unknown*/ = $(`prop`);
const x /*:object*/ /*truthy*/ = { ...tmpObjSpread, a: tmpObjLitVal };
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjSpread = $({ a: `ignored` });
const tmpObjLitVal = $(`prop`);
$({ ...tmpObjSpread, a: tmpObjLitVal });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: "ignored" };
const b = $( a );
const c = $( "prop" );
const d = {
  ... b,
  a: c,
};
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { a: `ignored` };
const tmpObjSpread = $(tmpCalleeParam);
const tmpObjLitVal = $(`prop`);
const x = { ...tmpObjSpread, a: tmpObjLitVal };
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '"ignored"' }
 - 2: 'prop'
 - 3: { a: '"prop"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
