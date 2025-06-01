# Preval test case

# arg_outlining_noarg.md

> Tofix > arg outlining noarg

When outlining an arg the reducer is currently blocked when not every call has an arg, like this example.
But I think it should treat that as `undefined` and resolve accordingly.

## Input

`````js filename=intro
const main_data_arr /*:array*/ = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
const the_self_closing_func /*:(primitive)=>primitive*/ = function ($$0) {
  const $dlr_$$1 /*:primitive*/ = $$0;
  debugger;
  const tmp1 /*:number*/ = $dlr_$$1 - 387;
  const tmp2 /*:primitive*/ = main_data_arr[tmp1];
  return tmp2;
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a /*:primitive*/ = the_self_closing_func(2);
  const b /*:number*/ = $Number_parseInt(a);
  $(`testing`, a, b);
  if (b) {
    break;
  } else {
    const tmpMCPa /*:primitive*/ = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
  }
}
const tmpCalleeParam /*:primitive*/ = the_self_closing_func();
$(tmpCalleeParam);
`````


## Settled


`````js filename=intro
const main_data_arr /*:array*/ = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
const the_self_closing_func /*:(primitive)=>primitive*/ = function ($$0) {
  const $dlr_$$2 /*:primitive*/ = $$0;
  debugger;
  const tmp1 /*:number*/ = $dlr_$$2 - 387;
  const tmp2 /*:primitive*/ = main_data_arr[tmp1];
  return tmp2;
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a /*:primitive*/ = the_self_closing_func(2);
  const b /*:number*/ = $Number_parseInt(a);
  $(`testing`, a, b);
  if (b) {
    break;
  } else {
    const tmpMCPa /*:primitive*/ = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
  }
}
const tmpCalleeParam /*:primitive*/ = the_self_closing_func();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const main_data_arr = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
const the_self_closing_func = function ($dlr_$$2) {
  const tmp1 = $dlr_$$2 - 387;
  const tmp2 = main_data_arr[tmp1];
  return tmp2;
};
while (true) {
  const a = the_self_closing_func(2);
  const b = $Number_parseInt(a);
  $(`testing`, a, b);
  if (b) {
    break;
  } else {
    $dotCall($array_push, main_data_arr, `push`, $dotCall($array_shift, main_data_arr, `shift`));
  }
}
$(the_self_closing_func());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "this", "contents", "is", "not", "relevant", "here" ];
const b = function($$0 ) {
  const c = $$0;
  debugger;
  const d = c - 387;
  const e = a[ d ];
  return e;
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = b( 2 );
  const g = $Number_parseInt( f );
  $( "testing", f, g );
  if (g) {
    break;
  }
  else {
    const h = $dotCall( $array_shift, a, "shift" );
    $dotCall( $array_push, a, "push", h );
  }
}
const i = b();
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const main_data_arr = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
const the_self_closing_func = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const $dlr_$$1 = $dlr_$$0;
  const tmp1 = $dlr_$$1 - 387;
  const tmp2 = main_data_arr[tmp1];
  return tmp2;
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = the_self_closing_func(2);
  const b = $Number_parseInt(a);
  $(`testing`, a, b);
  if (b) {
    break;
  } else {
    const tmpMCPa = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
  }
}
const tmpCalleeParam = the_self_closing_func();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Number_parseInt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'testing', undefined, NaN
 - 2: 'testing', undefined, NaN
 - 3: 'testing', undefined, NaN
 - 4: 'testing', undefined, NaN
 - 5: 'testing', undefined, NaN
 - 6: 'testing', undefined, NaN
 - 7: 'testing', undefined, NaN
 - 8: 'testing', undefined, NaN
 - 9: 'testing', undefined, NaN
 - 10: 'testing', undefined, NaN
 - 11: 'testing', undefined, NaN
 - 12: 'testing', undefined, NaN
 - 13: 'testing', undefined, NaN
 - 14: 'testing', undefined, NaN
 - 15: 'testing', undefined, NaN
 - 16: 'testing', undefined, NaN
 - 17: 'testing', undefined, NaN
 - 18: 'testing', undefined, NaN
 - 19: 'testing', undefined, NaN
 - 20: 'testing', undefined, NaN
 - 21: 'testing', undefined, NaN
 - 22: 'testing', undefined, NaN
 - 23: 'testing', undefined, NaN
 - 24: 'testing', undefined, NaN
 - 25: 'testing', undefined, NaN
 - 26: 'testing', undefined, NaN
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
