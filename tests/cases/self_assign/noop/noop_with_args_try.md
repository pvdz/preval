# Preval test case

# noop_with_args_try.md

> Self assign > Noop > Noop with args try
>
> Trying to move var decls that are functions down to move let decls closer to their real init.

## Input

`````js filename=intro
// SHOULD inline the_self_closing_func
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
  try {
    const a/*:unknown*/ = the_scf_alias(2);
    const b/*:number*/ = $Number_parseInt(a);
    $('testing', a, b); // anti-infini-loop
    if (b) {
      break;
    } else {
      const tmpMCPa/*:primitive*/ = $dotCall($array_shift, main_data_arr, `shift`);
      $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
    }
  } catch (_0x17f097) {
    $('crashing'); // anti-infini-loop
    const tmpMCPb/*:primitive*/ = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPb);
  }
}
`````


## Settled


`````js filename=intro
const main_data_arr /*:array*/ /*truthy*/ = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmp2 /*:unknown*/ = main_data_arr[-385];
  const b /*:number*/ = $Number_parseInt(tmp2);
  try {
    $(`testing`, tmp2, b);
    if (b) {
      break;
    } else {
      const tmpMCPa /*:primitive*/ /*truthy*/ = $dotCall($array_shift, main_data_arr, `shift`);
      $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
    }
  } catch (_0x17f097) {
    $(`crashing`);
    const tmpMCPb /*:primitive*/ /*truthy*/ = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPb);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const main_data_arr = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
while (true) {
  const tmp2 = main_data_arr[-385];
  const b = $Number_parseInt(tmp2);
  try {
    $(`testing`, tmp2, b);
    if (b) {
      break;
    } else {
      $dotCall($array_push, main_data_arr, `push`, $dotCall($array_shift, main_data_arr, `shift`));
    }
  } catch (_0x17f097) {
    $(`crashing`);
    $dotCall($array_push, main_data_arr, `push`, $dotCall($array_shift, main_data_arr, `shift`));
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "this", "contents", "is", "not", "relevant", "here" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ -385 ];
  const c = $Number_parseInt( b );
  try {
    $( "testing", b, c );
    if (c) {
      break;
    }
    else {
      const d = $dotCall( $array_shift, a, "shift" );
      $dotCall( $array_push, a, "push", d );
    }
  }
  catch (e) {
    $( "crashing" );
    const f = $dotCall( $array_shift, a, "shift" );
    $dotCall( $array_push, a, "push", f );
  }
}
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
  try {
    const a = the_scf_alias(2);
    const b = $Number_parseInt(a);
    $(`testing`, a, b);
    if (b) {
      break;
    } else {
      const tmpMCPa = $dotCall($array_shift, main_data_arr, `shift`);
      $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
    }
  } catch (_0x17f097) {
    $(`crashing`);
    const tmpMCPb = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPb);
  }
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) computed property access of an array but not index prop
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
