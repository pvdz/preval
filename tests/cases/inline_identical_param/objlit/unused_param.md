# Preval test case

# unused_param.md

> Inline identical param > Objlit > Unused param
>
>

## Input

`````js filename=intro
function f(x, obj, y) {
  $(x, y);
}
$(f);
f('x', {a: 1}, 'y');
f('w', {a: 3}, 'z');
`````


## Settled


`````js filename=intro
const f /*:(unknown, unknown)=>undefined*/ = function ($$0, $$1) {
  const x /*:unknown*/ = $$0;
  const y /*:unknown*/ = $$1;
  debugger;
  $(x, y);
  return undefined;
};
$(f);
$(`x`, `y`);
$(`w`, `z`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function (x, y) {
  $(x, y);
});
$(`x`, `y`);
$(`w`, `z`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  $( b, c );
  return undefined;
};
$( a );
$( "x", "y" );
$( "w", "z" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  let x = $$0;
  let obj = $$1;
  let y = $$2;
  debugger;
  $(x, y);
  return undefined;
};
$(f);
const tmpCallCallee = f;
let tmpCalleeParam = { a: 1 };
f(`x`, tmpCalleeParam, `y`);
const tmpCallCallee$1 = f;
let tmpCalleeParam$1 = { a: 3 };
f(`w`, tmpCalleeParam$1, `z`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: 'x', 'y'
 - 3: 'w', 'z'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
