# Preval test case

# back2back.md

> Objlit prop write > Back2back
>
>

## Input

`````js filename=intro
const obj = {};
obj.foo = 1;
$(obj);
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = { foo: 1 };
$(obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ foo: 1 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { foo: 1 };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { foo: 1 };
$(obj);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { foo: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
