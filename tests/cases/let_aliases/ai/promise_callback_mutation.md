# Preval test case

# promise_callback_mutation.md

> Let aliases > Ai > Promise callback mutation
>
> Mutation in a Promise callback (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
Promise.resolve().then(() => { x = "changed"; });
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
const tmpMCOO /*:promise*/ /*truthy*/ = $dotCall($Promise_resolve, Promise, `resolve`);
const tmpMCP /*:()=>undefined*/ = function () {
  debugger;
  x = `changed`;
  return undefined;
};
$dotCall($promise_then, tmpMCOO, `then`, tmpMCP);
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
$dotCall($promise_then, $dotCall($Promise_resolve, Promise, `resolve`), `then`, function () {
  x = `changed`;
});
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "val" );
const b = a;
const c = $dotCall( $Promise_resolve, Promise, "resolve" );
const d = function() {
  debugger;
  a = "changed";
  return undefined;
};
$dotCall( $promise_then, c, "then", d );
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
const tmpMCF = $Promise_resolve;
const tmpMCOO = $dotCall($Promise_resolve, Promise, `resolve`);
const tmpMCF$1 = tmpMCOO.then;
const tmpMCP = function () {
  debugger;
  x = `changed`;
  return undefined;
};
$dotCall(tmpMCF$1, tmpMCOO, `then`, tmpMCP);
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $promise_then
- (todo) type trackeed tricks can possibly support static $Promise_resolve
- (todo) type trackeed tricks can possibly support static $promise_then


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
