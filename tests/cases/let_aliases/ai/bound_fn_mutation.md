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
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
const tmpMCOO /*:()=>undefined*/ = function () {
  debugger;
  x = `changed`;
  return undefined;
};
const mutate /*:function*/ /*truthy*/ = $dotCall($function_bind, tmpMCOO, `bind`, null);
mutate();
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
const mutate = $dotCall(
  $function_bind,
  function () {
    x = `changed`;
  },
  `bind`,
  null,
);
mutate();
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "val" );
const b = a;
const c = function() {
  debugger;
  a = "changed";
  return undefined;
};
const d = $dotCall( $function_bind, c, "bind", null );
d();
$( b, a );
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
