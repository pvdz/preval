# Preval test case

# await.md

> Bool trampoline > Await
>
> Don't do this.

This is testing a cloning edge case when it concerns `await`

## Input

`````js filename=intro
async function f(x) {
  x = $(0);
  const y = await x;
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('pass'); // Always returns a promise and promises are truthy
else $('fail');
`````


## Settled


`````js filename=intro
const f /*:()=>promise*/ = async function () {
  debugger;
  const x /*:unknown*/ = $(0);
  const y /*:unknown*/ = await x;
  return y;
};
$(f);
$(f);
f();
$(`pass`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = async function () {
  const x = $(0);
  const y = await x;
  return y;
};
$(f);
$(f);
f();
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = async function() {
  debugger;
  const b = $( 0 );
  const c = (await (b));
  return c;
};
$( a );
$( a );
a();
$( "pass" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = async function ($$0) {
  let x = $$0;
  debugger;
  x = $(0);
  const y = await x;
  return y;
};
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## Todos triggered


- (todo) inline async functions safely (because await)


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 0
 - 4: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
