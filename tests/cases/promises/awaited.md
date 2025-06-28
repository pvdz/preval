# Preval test case

# awaited.md

> Promises > Awaited
>
>

## Input

`````js filename=intro
async function f(x) {
  $(x);
}
async function g(y) {
  await f(y);
}
$(g(100));
`````


## Settled


`````js filename=intro
const g /*:()=>promise*/ = async function () {
  debugger;
  let tmpAwaitArg /*:unknown*/ = undefined;
  try {
    $(100);
    tmpAwaitArg = $Promise_resolve(undefined);
  } catch (tmpRejectErr) {
    tmpAwaitArg = $Promise_reject(tmpRejectErr);
  }
  await tmpAwaitArg;
  return undefined;
};
const tmpCalleeParam /*:promise*/ /*truthy*/ = g();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = async function () {
  let tmpAwaitArg = undefined;
  try {
    $(100);
    tmpAwaitArg = $Promise_resolve(undefined);
  } catch (tmpRejectErr) {
    tmpAwaitArg = $Promise_reject(tmpRejectErr);
  }
  await tmpAwaitArg;
};
$(g());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = async function() {
  debugger;
  let b = undefined;
  try {
    $( 100 );
    b = $Promise_resolve( undefined );
  }
  catch (c) {
    b = $Promise_reject( c );
  }
  (await (b));
  return undefined;
};
const d = a();
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = async function ($$0) {
  let x = $$0;
  debugger;
  $(x);
  return undefined;
};
let g = async function ($$0) {
  let y = $$0;
  debugger;
  const tmpAwaitArg = f(y);
  await tmpAwaitArg;
  return undefined;
};
let tmpCalleeParam = g(100);
$(tmpCalleeParam);
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
 - 1: 100
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
