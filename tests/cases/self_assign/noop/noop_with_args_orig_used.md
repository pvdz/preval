# Preval test case

# noop_with_args_orig_used.md

> Self assign > Noop > Noop with args orig used
>
> Trying to move var decls that are functions down to move let decls closer to their real init.

This means the result between closure and non-closure is observable, edge cases aside, so we should bail.

## Input

`````js filename=intro
// Should NOT inline the_self_closing_func because it's calling alias and sealer
const main_data_arr/*:array*/ = ['this', 'contents', 'is', 'not', 'relevant', 'here'];
let the_self_closing_func/*:(unknown, unknown)=>unknown*/ = function($$0, $$1) {
  const dud_arg1/*:unknown*/ = $$0;
  const dud_arg2/*:unknown*/ = $$1;
  debugger;
  the_self_closing_func = function($$0, $$1) {
    const noop_arg/*:unknown*/ = $$0;
    debugger;
    const tmp1/*:number*/ = noop_arg - 387;
    const tmp2/*:primitive*/ = main_data_arr[tmp1];
    return tmp2;
  };
  const once/*:unknown*/ = the_self_closing_func(dud_arg1, dud_arg2);
  return once;
};
const the_scf_alias/*:unknown*/ = the_self_closing_func;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a/*:unknown*/ = the_scf_alias(2);
  const b/*:number*/ = $Number_parseInt(a);
  $('testing', a, b); // anti-infini-loop
  if (b) {
    break;
  } else {
    const tmpMCPa/*:primitive*/ = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
  }
}
$(the_self_closing_func()); // This should NOT prevent the transform (!), only the alias

`````


## Settled


`````js filename=intro
const main_data_arr /*:array*/ /*truthy*/ = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a /*:primitive*/ = main_data_arr[NaN];
  const b /*:number*/ = $Number_parseInt(a);
  $(`testing`, a, b);
  if (b) {
    break;
  } else {
    const tmpMCPa /*:primitive*/ /*truthy*/ = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
  }
}
const tmpCalleeParam /*:primitive*/ = main_data_arr[NaN];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const main_data_arr = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
while (true) {
  const a = main_data_arr[NaN];
  const b = $Number_parseInt(a);
  $(`testing`, a, b);
  if (b) {
    break;
  } else {
    $dotCall($array_push, main_data_arr, `push`, $dotCall($array_shift, main_data_arr, `shift`));
  }
}
$(main_data_arr[NaN]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "this", "contents", "is", "not", "relevant", "here" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ NaN ];
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
const e = a[ NaN ];
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const main_data_arr = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
let the_self_closing_func = function ($$0, $$1) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const dud_arg1 = $dlr_$$0;
  const dud_arg2 = $dlr_$$1;
  the_self_closing_func = function ($$0, $$1) {
    let $dlr_$$2 = $$0;
    let $dlr_$$4 = $$1;
    debugger;
    const noop_arg = $dlr_$$2;
    const tmp1 = noop_arg - 387;
    const tmp2 = main_data_arr[tmp1];
    return tmp2;
  };
  const once = the_self_closing_func(dud_arg1, dud_arg2);
  return once;
};
const the_scf_alias = the_self_closing_func;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = the_scf_alias(2);
  const b = $Number_parseInt(a);
  $(`testing`, a, b);
  if (b) {
    break;
  } else {
    const tmpMCPa = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
  }
}
let tmpCalleeParam = the_self_closing_func();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $Number_parseInt
- (todo) we can still proceed with the loop as long as there is no let-write anywhere in the loop, inc nested


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
