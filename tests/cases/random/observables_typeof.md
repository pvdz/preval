# Preval test case

# observables_typeof.md

> Random > Observables typeof
>
> Just covering

## Input

`````js filename=intro
const f = function() {
  debugger;
  const x = $(1);
  let y = false;
  y = typeof x;
  $(`block`);
  $(`block`);
  return y;
};
f();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Settled


`````js filename=intro
const f /*:()=>string*/ = function () {
  debugger;
  const x /*:unknown*/ = $(1);
  $(`block`);
  $(`block`);
  const y /*:string*/ = typeof x;
  return y;
};
f();
const tmpCalleeParam /*:string*/ = f();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const x = $(1);
  $(`block`);
  $(`block`);
  const y = typeof x;
  return y;
};
f();
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  $( "block" );
  $( "block" );
  const c = typeof b;
  return c;
};
a();
const d = a();
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  const x = $(1);
  let y = false;
  y = typeof x;
  $(`block`);
  $(`block`);
  return y;
};
f();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'block'
 - 3: 'block'
 - 4: 1
 - 5: 'block'
 - 6: 'block'
 - 7: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
