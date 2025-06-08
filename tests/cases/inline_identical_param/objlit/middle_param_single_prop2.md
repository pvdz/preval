# Preval test case

# middle_param_single_prop2.md

> Inline identical param > Objlit > Middle param single prop2
>
>

## Input

`````js filename=intro
const f = function(x, a, y) {
  let obj = { a: a };
  const tmpCalleeParam$3 = obj.a;
  $(x, y, tmpCalleeParam$3);
};
const tmpCalleeParam$7 = { a: 1 };
f(1, tmpCalleeParam$7, `y`);
const tmpCalleeParam$13 = { a: 3 };
f(3, tmpCalleeParam$13, `z`);
`````


## Settled


`````js filename=intro
const f /*:(number, number, string)=>undefined*/ = function ($$0, $$1, $$2) {
  const x /*:number*/ = $$0;
  const a$1 /*:number*/ = $$1;
  const y /*:string*/ = $$2;
  debugger;
  const a /*:object*/ /*truthy*/ = { a: a$1 };
  $(x, y, a);
  return undefined;
};
f(1, 1, `y`);
f(3, 3, `z`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (x, a$1, y) {
  $(x, y, { a: a$1 });
};
f(1, 1, `y`);
f(3, 3, `z`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = $$0;
  const c = $$1;
  const d = $$2;
  debugger;
  const e = { a: c };
  $( b, d, e );
  return undefined;
};
a( 1, 1, "y" );
a( 3, 3, "z" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0, $$1, $$2) {
  let x = $$0;
  let a = $$1;
  let y = $$2;
  debugger;
  let obj = { a: a };
  const tmpCalleeParam$3 = obj.a;
  $(x, y, tmpCalleeParam$3);
  return undefined;
};
const tmpCalleeParam$7 = { a: 1 };
f(1, tmpCalleeParam$7, `y`);
const tmpCalleeParam$13 = { a: 3 };
f(3, tmpCalleeParam$13, `z`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'y', { a: '1' }
 - 2: 3, 'z', { a: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
