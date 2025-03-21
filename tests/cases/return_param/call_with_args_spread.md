# Preval test case

# call_with_args_spread.md

> Return param > Call with args spread
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x(1, 'two', null, NaN);
  return y;
}

$(f(function(...args){ $('pass1', args); }));
$(f(function(...args){ $('pass2', args); }));
$(f(function(...args){ $('pass3', args); }));
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  return undefined;
};
const tmpCalleeParam$1 /*:(array)=>undefined*/ = function (...$$0 /*:array*/) {
  const args /*:array*/ = $$0;
  debugger;
  $(`pass1`, args);
  return undefined;
};
f();
tmpCalleeParam$1(1, `two`, null, NaN);
$(undefined);
const tmpCalleeParam$5 /*:(array)=>undefined*/ = function (...$$0 /*:array*/) {
  const args$1 /*:array*/ = $$0;
  debugger;
  $(`pass2`, args$1);
  return undefined;
};
f();
tmpCalleeParam$5(1, `two`, null, NaN);
$(undefined);
const tmpCalleeParam$9 /*:(array)=>undefined*/ = function (...$$0 /*:array*/) {
  const args$3 /*:array*/ = $$0;
  debugger;
  $(`pass3`, args$3);
  return undefined;
};
f();
tmpCalleeParam$9(1, `two`, null, NaN);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(`no`);
  $(`inlining`);
  $(`please`);
};
const tmpCalleeParam$1 = function (...$$0 /*:array*/) {
  $(`pass1`, $$0);
};
f();
tmpCalleeParam$1(1, `two`, null, NaN);
$(undefined);
const tmpCalleeParam$5 = function (...$$0 /*:array*/) {
  $(`pass2`, $$0);
};
f();
tmpCalleeParam$5(1, `two`, null, NaN);
$(undefined);
const tmpCalleeParam$9 = function (...$$0 /*:array*/) {
  $(`pass3`, $$0);
};
f();
tmpCalleeParam$9(1, `two`, null, NaN);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "no" );
  $( "inlining" );
  $( "please" );
  return undefined;
};
const b = function($$0 ) {
  const c = $$0;
  debugger;
  $( "pass1", c );
  return undefined;
};
a();
b( 1, "two", null, NaN );
$( undefined );
const d = function($$0 ) {
  const e = $$0;
  debugger;
  $( "pass2", e );
  return undefined;
};
a();
d( 1, "two", null, NaN );
$( undefined );
const f = function($$0 ) {
  const g = $$0;
  debugger;
  $( "pass3", g );
  return undefined;
};
a();
f( 1, "two", null, NaN );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: 'pass1', [1, 'two', null, NaN]
 - 5: undefined
 - 6: 'no'
 - 7: 'inlining'
 - 8: 'please'
 - 9: 'pass2', [1, 'two', null, NaN]
 - 10: undefined
 - 11: 'no'
 - 12: 'inlining'
 - 13: 'please'
 - 14: 'pass3', [1, 'two', null, NaN]
 - 15: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
