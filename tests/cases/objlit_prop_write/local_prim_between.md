# Preval test case

# local_prim_between.md

> Objlit prop write > Local prim between
>
>

## Input

`````js filename=intro
const obj = {};
const f = function(){};
const foo = 1;
obj.x = foo;
$(obj);
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = { x: 1 };
$(obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: 1 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  return undefined;
};
const foo = 1;
const obj = { x: foo };
$(obj);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
