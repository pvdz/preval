# Preval test case

# call_with_args.md

> Return param > Call with args
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

$(f(function(a,b,c,d,e){ $('pass1', a,b,c,d,e); }));
$(f(function(a,b,c,d,e){ $('pass2', a,b,c,d,e); }));
$(f(function(a,b,c,d,e){ $('pass3', a,b,c,d,e); }));
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  return undefined;
};
f();
$(`pass1`, 1, `two`, null, $Number_NaN, undefined);
$(undefined);
f();
$(`pass2`, 1, `two`, null, $Number_NaN, undefined);
$(undefined);
f();
$(`pass3`, 1, `two`, null, $Number_NaN, undefined);
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
f();
$(`pass1`, 1, `two`, null, $Number_NaN, undefined);
$(undefined);
f();
$(`pass2`, 1, `two`, null, $Number_NaN, undefined);
$(undefined);
f();
$(`pass3`, 1, `two`, null, $Number_NaN, undefined);
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
a();
$( "pass1", 1, "two", null, $Number_NaN, undefined );
$( undefined );
a();
$( "pass2", 1, "two", null, $Number_NaN, undefined );
$( undefined );
a();
$( "pass3", 1, "two", null, $Number_NaN, undefined );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = x(1, `two`, null, $Number_NaN);
  return y;
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = function ($$0, $$1, $$2, $$3, $$4) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  $(`pass1`, a, b, c, d, e);
  return undefined;
};
let tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCallCallee$1 = f;
let tmpCalleeParam$5 = function ($$0, $$1, $$2, $$3, $$4) {
  let a$1 = $$0;
  let b$1 = $$1;
  let c$1 = $$2;
  let d$1 = $$3;
  let e$1 = $$4;
  debugger;
  $(`pass2`, a$1, b$1, c$1, d$1, e$1);
  return undefined;
};
let tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
const tmpCallCallee$3 = f;
let tmpCalleeParam$9 = function ($$0, $$1, $$2, $$3, $$4) {
  let a$3 = $$0;
  let b$3 = $$1;
  let c$3 = $$2;
  let d$3 = $$3;
  let e$3 = $$4;
  debugger;
  $(`pass3`, a$3, b$3, c$3, d$3, e$3);
  return undefined;
};
let tmpCalleeParam$7 = f(tmpCalleeParam$9);
$(tmpCalleeParam$7);
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
 - 4: 'pass1', 1, 'two', null, NaN, undefined
 - 5: undefined
 - 6: 'no'
 - 7: 'inlining'
 - 8: 'please'
 - 9: 'pass2', 1, 'two', null, NaN, undefined
 - 10: undefined
 - 11: 'no'
 - 12: 'inlining'
 - 13: 'please'
 - 14: 'pass3', 1, 'two', null, NaN, undefined
 - 15: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
