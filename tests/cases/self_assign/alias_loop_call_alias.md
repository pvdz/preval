# Preval test case

# alias_loop_call_alias.md

> Self assign > Alias loop call alias
>
> Trying to move var decls that are functions down to move let decls closer to their real init.

## Input

`````js filename=intro
const main_data_arr/*:array*/ = [`ike there `, `wgcCwgZikg`, `LmNvbmNhdC`, `eBestCandi`, ` using the`];
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
while ($LOOP_NO_UNROLLS_LEFT) {
  const a/*:unknown*/ = the_scf_alias(4639);
  const b/*:number*/ = $Number_parseInt(a);
  const c/*:unknown*/ = the_scf_alias(710);
  const d/*:number*/ = $Number_parseInt(c);
  const e/*:unknown*/ = the_scf_alias(851);
  const f/*:number*/ = $Number_parseInt(e);
  const g/*:unknown*/ = the_scf_alias(2173);
  const h/*:number*/ = $Number_parseInt(g);
  const i/*:unknown*/ = the_scf_alias(2207);
  const j/*:number*/ = $Number_parseInt(i);
  const k/*:unknown*/ = the_scf_alias(5120);
  const l/*:number*/ = $Number_parseInt(k);
  const m/*:unknown*/ = the_scf_alias(4863);
  const n/*:number*/ = $Number_parseInt(m);
  const o/*:unknown*/ = the_scf_alias(6199);
  const p/*:number*/ = $Number_parseInt(o);
  const q/*:unknown*/ = the_scf_alias(4934);
  const r/*:number*/ = $Number_parseInt(q);
  const s/*:unknown*/ = the_scf_alias(5245);
  const t/*:number*/ = $Number_parseInt(s);
  const u/*:unknown*/ = the_scf_alias(4723);
  const v/*:number*/ = $Number_parseInt(u);
  const w/*:boolean*/ = v === 330166;
  $('testing'); // anti-infini-loop
  if (w) {
    break;
  } else {
    const tmpMCPa/*:primitive*/ = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
  }
}
`````


## Settled


`````js filename=intro
const main_data_arr /*:array*/ /*truthy*/ = [`ike there `, `wgcCwgZikg`, `LmNvbmNhdC`, `eBestCandi`, ` using the`];
while ($LOOP_NO_UNROLLS_LEFT) {
  $(`testing`);
  const tmpMCPa /*:primitive*/ /*truthy*/ = $dotCall($array_shift, main_data_arr, `shift`);
  $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const main_data_arr = [`ike there `, `wgcCwgZikg`, `LmNvbmNhdC`, `eBestCandi`, ` using the`];
while (true) {
  $(`testing`);
  $dotCall($array_push, main_data_arr, `push`, $dotCall($array_shift, main_data_arr, `shift`));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "ike there ", "wgcCwgZikg", "LmNvbmNhdC", "eBestCandi", " using the" ];
while ($LOOP_NO_UNROLLS_LEFT) {
  $( "testing" );
  const b = $dotCall( $array_shift, a, "shift" );
  $dotCall( $array_push, a, "push", b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const main_data_arr = [`ike there `, `wgcCwgZikg`, `LmNvbmNhdC`, `eBestCandi`, ` using the`];
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
while ($LOOP_NO_UNROLLS_LEFT) {
  const a = the_scf_alias(4639);
  const b = $Number_parseInt(a);
  const c = the_scf_alias(710);
  const d = $Number_parseInt(c);
  const e = the_scf_alias(851);
  const f = $Number_parseInt(e);
  const g = the_scf_alias(2173);
  const h = $Number_parseInt(g);
  const i = the_scf_alias(2207);
  const j = $Number_parseInt(i);
  const k = the_scf_alias(5120);
  const l = $Number_parseInt(k);
  const m = the_scf_alias(4863);
  const n = $Number_parseInt(m);
  const o = the_scf_alias(6199);
  const p = $Number_parseInt(o);
  const q = the_scf_alias(4934);
  const r = $Number_parseInt(q);
  const s = the_scf_alias(5245);
  const t = $Number_parseInt(s);
  const u = the_scf_alias(4723);
  const v = $Number_parseInt(u);
  const w = v === 330166;
  $(`testing`);
  if (w) {
    break;
  } else {
    const tmpMCPa = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
  }
}
`````


## Todos triggered


- (todo) free with zero args, we can eliminate this?
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $Number_parseInt
- (todo) we can still proceed with the loop as long as there is no let-write anywhere in the loop, inc nested


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'testing'
 - 2: 'testing'
 - 3: 'testing'
 - 4: 'testing'
 - 5: 'testing'
 - 6: 'testing'
 - 7: 'testing'
 - 8: 'testing'
 - 9: 'testing'
 - 10: 'testing'
 - 11: 'testing'
 - 12: 'testing'
 - 13: 'testing'
 - 14: 'testing'
 - 15: 'testing'
 - 16: 'testing'
 - 17: 'testing'
 - 18: 'testing'
 - 19: 'testing'
 - 20: 'testing'
 - 21: 'testing'
 - 22: 'testing'
 - 23: 'testing'
 - 24: 'testing'
 - 25: 'testing'
 - 26: 'testing'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
