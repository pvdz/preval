# Preval test case

# bound_fn_mutation.md

> Let aliases > Ai > Bound fn mutation
>
> Mutation in a bound function (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
const mutate = function() { x = "changed"; }.bind(null);
mutate();
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
const tmpMCOO /*:()=>undefined*/ = function () {
  debugger;
  return undefined;
};
const mutate /*:function*/ /*truthy*/ = $dotCall($function_bind, tmpMCOO, `bind`, null);
mutate();
$(x, `changed`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
const mutate = $dotCall($function_bind, function () {}, `bind`, null);
mutate();
$(x, `changed`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
const b = function() {
  debugger;
  return undefined;
};
const c = $dotCall( $function_bind, b, "bind", null );
c();
$( a, "changed" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
const tmpMCOO = function () {
  debugger;
  x = `changed`;
  return undefined;
};
const tmpMCF = tmpMCOO.bind;
const mutate = $dotCall(tmpMCF, tmpMCOO, `bind`, null);
mutate();
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_bind
- (todo) this may support .call .apply and .bind but I think that different reducers should tackle it
- (todo) type trackeed tricks can possibly support static $function_bind


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
