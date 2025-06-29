# Preval test case

# ai_async_function_return_opaque2.md

> Promises > Ai async function return opaque2
>
> Test: Async function returning an opaque value.

## Input

`````js filename=intro
// Expected: Async function wraps opaque return value in a Promise.
async function test() {
  return $('opaque_return');
}
test();
`````


## Settled


`````js filename=intro
try {
  $(`opaque_return`);
} catch (tmpRejectErr) {}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(`opaque_return`);
} catch (tmpRejectErr) {}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( "opaque_return" );
}
catch (a) {

}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let test = async function () {
  debugger;
  const tmpReturnArg = $(`opaque_return`);
  return tmpReturnArg;
};
test();
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) inline async functions safely (because await)
- (todo) type trackeed tricks can possibly support static $Promise_reject
- (todo) type trackeed tricks can possibly support static $Promise_resolve


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'opaque_return'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
