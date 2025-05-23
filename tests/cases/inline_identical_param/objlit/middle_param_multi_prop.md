# Preval test case

# middle_param_multi_prop.md

> Inline identical param > Objlit > Middle param multi prop
>
>

## Input

`````js filename=intro
function f(x, obj, y) {
  $(x, y, obj.a);
  $(x, y, obj.b);
  $(x, y, obj.c);
  $(x, y, obj.d);
}

f("first1", {a: 1, b: 2, c: 'hi', d: parseInt}, "last1");
f("first2", {a: 3, b: 4, c: true, d: null}, "last2");
`````


## Settled


`````js filename=intro
const f /*:(string, number, string, number, primitive, unknown)=>undefined*/ = function ($$0, $$1, $$2, $$3, $$4, $$5) {
  const d /*:unknown*/ = $$5;
  const c /*:primitive*/ = $$4;
  const b /*:number*/ = $$3;
  const x /*:string*/ = $$0;
  const a /*:number*/ = $$1;
  const y /*:string*/ = $$2;
  debugger;
  $(x, y, a);
  $(x, y, b);
  $(x, y, c);
  $(x, y, d);
  return undefined;
};
f(`first1`, 1, `last1`, 2, `hi`, $Number_parseInt);
f(`first2`, 3, `last2`, 4, true, null);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (x, a, y, b, c, d) {
  $(x, y, a);
  $(x, y, b);
  $(x, y, c);
  $(x, y, d);
};
f(`first1`, 1, `last1`, 2, `hi`, $Number_parseInt);
f(`first2`, 3, `last2`, 4, true, null);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2,$$3,$$4,$$5 ) {
  const b = $$5;
  const c = $$4;
  const d = $$3;
  const e = $$0;
  const f = $$1;
  const g = $$2;
  debugger;
  $( e, g, f );
  $( e, g, d );
  $( e, g, c );
  $( e, g, b );
  return undefined;
};
a( "first1", 1, "last1", 2, "hi", $Number_parseInt );
a( "first2", 3, "last2", 4, true, null );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  let x = $$0;
  let obj = $$1;
  let y = $$2;
  debugger;
  let tmpCalleeParam = x;
  let tmpCalleeParam$1 = y;
  let tmpCalleeParam$3 = obj.a;
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  let tmpCalleeParam$5 = x;
  let tmpCalleeParam$7 = y;
  let tmpCalleeParam$9 = obj.b;
  $(tmpCalleeParam$5, tmpCalleeParam$7, tmpCalleeParam$9);
  let tmpCalleeParam$11 = x;
  let tmpCalleeParam$13 = y;
  let tmpCalleeParam$15 = obj.c;
  $(tmpCalleeParam$11, tmpCalleeParam$13, tmpCalleeParam$15);
  let tmpCalleeParam$17 = x;
  let tmpCalleeParam$19 = y;
  let tmpCalleeParam$21 = obj.d;
  $(tmpCalleeParam$17, tmpCalleeParam$19, tmpCalleeParam$21);
  return undefined;
};
const tmpCallCallee = f;
let tmpCalleeParam$23 = { a: 1, b: 2, c: `hi`, d: parseInt };
f(`first1`, tmpCalleeParam$23, `last1`);
const tmpCallCallee$1 = f;
let tmpCalleeParam$25 = { a: 3, b: 4, c: true, d: null };
f(`first2`, tmpCalleeParam$25, `last2`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'first1', 'last1', 1
 - 2: 'first1', 'last1', 2
 - 3: 'first1', 'last1', 'hi'
 - 4: 'first1', 'last1', '<function>'
 - 5: 'first2', 'last2', 3
 - 6: 'first2', 'last2', 4
 - 7: 'first2', 'last2', true
 - 8: 'first2', 'last2', null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
