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
while ($LOOP_NO_UNROLLS_LEFT) {
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
const main_data_arr /*:array*/ /*truthy*/ = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
while ($LOOP_NO_UNROLLS_LEFT) {
  const a /*:unknown*/ = main_data_arr[-385];
  const b /*:number*/ = $Number_parseInt(a);
  $(`testing`, a, b);
  if (b) {
    break;
  } else {
    const tmpMCPa /*:primitive*/ /*truthy*/ = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
  }
}
const tmpCalleeParam /*:primitive*/ = main_data_arr[$Number_NaN];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const main_data_arr = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
while (true) {
  const a = main_data_arr[-385];
  const b = $Number_parseInt(a);
  $(`testing`, a, b);
  if (b) {
    break;
  } else {
    $dotCall($array_push, main_data_arr, `push`, $dotCall($array_shift, main_data_arr, `shift`));
  }
}
$(main_data_arr[$Number_NaN]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "this", "contents", "is", "not", "relevant", "here" ];
while ($LOOP_NO_UNROLLS_LEFT) {
  const b = a[ -385 ];
  const c = $Number_parseInt( b );
  $( "testing", b, c );
  if (c) {
    break;
  }
  else {
    const d = $dotCall( $array_shift, a, "shift" );
    $dotCall( $array_push, a, "push", d );
  }
}
const e = a[ $Number_NaN ];
$( e );
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
while ($LOOP_NO_UNROLLS_LEFT) {
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


- (todo) computed property access of an array but not index prop
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
