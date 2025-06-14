# Preval test case

# method_prop.md

> Normalize > Object > Dupe props > Method prop
>
> Duplicate properties are legal but useless. We should get rid of them.

## Input

`````js filename=intro
const x = {a(){}, a: $('prop')};
$(x);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(`prop`);
const x /*:object*/ /*truthy*/ = { a: tmpObjLitVal };
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(`prop`);
$({ a: tmpObjLitVal });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "prop" );
const b = { a: a };
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(`prop`);
const x = { a: tmpObjLitVal };
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'prop'
 - 2: { a: '"prop"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
