# Preval test case

# ai_rule320_double_await_opaque.md

> Ai > Ai3 > Ai rule320 double await opaque
>
> Test: Double await on an opaque value.

## Input

`````js filename=intro
// Expected: async function f() { let x = $('p'); let y = await await x; $('result', y); } f();
async function f() {
  let x = $('p');
  let y = await await x;
  $('result', y);
}
f();
`````


## Settled


`````js filename=intro
const f /*:()=>promise*/ = async function () {
  debugger;
  const x /*:unknown*/ = $(`p`);
  const tmpAwaitArg /*:unknown*/ = await x;
  const y /*:unknown*/ = await tmpAwaitArg;
  $(`result`, y);
  return undefined;
};
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = async function () {
  const x = $(`p`);
  const tmpAwaitArg = await x;
  $(`result`, await tmpAwaitArg);
};
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = async function() {
  debugger;
  const b = $( "p" );
  const c = (await (b));
  const d = (await (c));
  $( "result", d );
  return undefined;
};
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = async function () {
  debugger;
  let x = $(`p`);
  const tmpAwaitArg = await x;
  let y = await tmpAwaitArg;
  $(`result`, y);
  return undefined;
};
f();
`````


## Todos triggered


- (todo) inline async functions safely (because await)


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'p'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
