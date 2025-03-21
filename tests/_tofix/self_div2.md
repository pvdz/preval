# Preval test case

# self_div2.md

> Tofix > self div2

- can we do better to predict the arg/arg ? It's 1 or NaN, right? but a spy would be called twice.
- if we know a function would not spy IF given primitives and we see it being called with primitives can we not create a $free function for the whole func and replace at least those calls, which may then hopefully resolve by preval?
  - and when the input is number, we know the result is input+1
  - after that, the function can be outlined to the only remaining call, which may simplify the $spy call a bit?
- the original function would keep calling itself, so not $(argup) but f(argup)

## Input

`````js filename=intro
const f /*:(unknown)=>undefined*/ = function(arg) {
  const oneOrNan /*:number*/ = arg / arg;
  const onestr /*:string*/ = $coerce(oneOrNan, `string`);
  const len /*:number*/ = onestr.length;
  const isone /*:boolean*/ = len === 1;
  if (isone) {
    arg % 0;
  } else {
  }
  const argup /*:primitive*/ = arg + 1;
  $(argup);
  return undefined;
};
f(500);
const tmpCalleeParam /*:unknown*/ = $spy();
const tmpSaooB /*:string*/ = typeof tmpCalleeParam;
const tmpSaooB$1 /*:boolean*/ = tmpSaooB === `string`;
if (tmpSaooB$1) {
} else {
  f(tmpCalleeParam);
}
`````


## Settled


`````js filename=intro
const f /*:(unknown)=>undefined*/ = function ($$0) {
  const arg /*:unknown*/ = $$0;
  debugger;
  const oneOrNan /*:number*/ = arg / arg;
  const onestr /*:string*/ = $coerce(oneOrNan, `string`);
  const len /*:number*/ = onestr.length;
  const isone /*:boolean*/ = len === 1;
  if (isone) {
    arg % 0;
  } else {
  }
  const argup /*:primitive*/ = arg + 1;
  $(argup);
  return undefined;
};
f(500);
const tmpCalleeParam /*:unknown*/ = $spy();
const tmpSaooB /*:string*/ = typeof tmpCalleeParam;
const tmpSaooB$1 /*:boolean*/ = tmpSaooB === `string`;
if (tmpSaooB$1) {
} else {
  f(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (arg) {
  if ($coerce(arg / arg, `string`).length === 1) {
    arg % 0;
  }
  $(arg + 1);
};
f(500);
const tmpCalleeParam = $spy();
if (!(typeof tmpCalleeParam === `string`)) {
  f(tmpCalleeParam);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = b / b;
  const d = $coerce( c, "string" );
  const e = d.length;
  const f = e === 1;
  if (f) {
    b % 0;
  }
  const g = b + 1;
  $( g );
  return undefined;
};
a( 500 );
const h = $spy();
const i = typeof h;
const j = i === "string";
if (j) {

}
else {
  a( h );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 501
 - 2: 'Creating spy', 1, 0, ['spy', 12345]
 - 3: '$spy[1].valueOf()'
 - 4: '$spy[1].valueOf()'
 - 5: '$spy[1].valueOf()'
 - 6: '$spy[1].valueOf()'
 - 7: 12346
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
