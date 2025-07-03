# Preval test case

# noop_with_args_transitive_alias_unused.md

> Self assign > Noop > Noop with args transitive alias unused
>
> Trying to move var decls that are functions down to move let decls closer to their real init.

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
const the_scf_alias = the_self_closing_func;
const the_scf_alias2 = the_scf_alias1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a/*:unknown*/ = the_scf_alias2(2);
  const b/*:number*/ = $Number_parseInt(a);
  $('testing', a, b); // anti-infini-loop
  if (b) {
    break;
  } else {
    const tmpMCPa/*:primitive*/ = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
  }
}
$(the_self_closing_func()); // This should prevent the transform (!)
`````


## Settled


`````js filename=intro
const the_scf_alias2 /*:unknown*/ = the_scf_alias1;
const main_data_arr /*:array*/ /*truthy*/ = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a /*:unknown*/ = the_scf_alias2(2);
  const b /*:number*/ = $Number_parseInt(a);
  $(`testing`, a, b);
  if (b) {
    break;
  } else {
    const tmpMCPa /*:primitive*/ /*truthy*/ = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
  }
}
const tmp2 /*:primitive*/ = main_data_arr[NaN];
$(tmp2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const the_scf_alias2 = the_scf_alias1;
const main_data_arr = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
while (true) {
  const a = the_scf_alias2(2);
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
const a = the_scf_alias1;
const b = [ "this", "contents", "is", "not", "relevant", "here" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = a( 2 );
  const d = $Number_parseInt( c );
  $( "testing", c, d );
  if (d) {
    break;
  }
  else {
    const e = $dotCall( $array_shift, b, "shift" );
    $dotCall( $array_push, b, "push", e );
  }
}
const f = b[ NaN ];
$( f );
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
const the_scf_alias2 = the_scf_alias1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = the_scf_alias2(2);
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
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $Number_parseInt


## Globals


BAD@! Found 1 implicit global bindings:

the_scf_alias1


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
