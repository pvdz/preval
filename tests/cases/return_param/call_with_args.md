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
