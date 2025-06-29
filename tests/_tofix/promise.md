# Preval test case

# promise.md

> Tofix > promise
>
> is this worth exploring?

An async function trampolining an awaited new Promise ... surely we can fold that.

## Input

`````js filename=intro
const f = async function() {
  debugger;
  const tmpNewCallee/*:unknown*/ = Promise;
  const tmpAwaitArg$1/*:object*/ /*truthy*/ = new tmpNewCallee(tmpCalleeParam$687);
  await (tmpAwaitArg$1);
  return undefined;
};
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>promise*/ = async function () {
  debugger;
  const tmpAwaitArg$1 /*:object*/ /*truthy*/ = new Promise(tmpCalleeParam$687);
  await tmpAwaitArg$1;
  return undefined;
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(async function () {
  const tmpAwaitArg$1 = new Promise(tmpCalleeParam$687);
  await tmpAwaitArg$1;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = async function() {
  debugger;
  const b = new Promise( tmpCalleeParam$687 );
  (await (b));
  return undefined;
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = async function () {
  debugger;
  const tmpNewCallee = Promise;
  const tmpAwaitArg$1 = new tmpNewCallee(tmpCalleeParam$687);
  await tmpAwaitArg$1;
  return undefined;
};
$(f);
`````


## Todos triggered


- (todo) inline async functions safely (because await)


## Globals


BAD@! Found 1 implicit global bindings:

tmpCalleeParam$687


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
