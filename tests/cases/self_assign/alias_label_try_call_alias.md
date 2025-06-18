# Preval test case

# alias_label_try_call_alias.md

> Self assign > Alias label try call alias
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
loopStop$1: {
  try {
    const tmpUnaryArg$6/*:number*/ = $Number_parseInt(the_scf_alias(4639));
    const tmpBinLhs$166/*:number*/ = $Number_parseInt(the_scf_alias(710));
    if (tmpUnaryArg$6 + tmpBinLhs$166) {
      break loopStop$1;
    } else {
      const e = $dotCall($array_shift, main_data_arr, `shift`);
      $dotCall($array_push, main_data_arr, `push`, e);
    }
  } catch (_0x17f097) {
    const f = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, f);
  }
  try {
    const tmpUnaryArg$12/*:number*/ = $Number_parseInt(the_scf_alias(4639));
    const tmpBinLhs$143/*:number*/ = $Number_parseInt(the_scf_alias(710));
    if (tmpUnaryArg$12 + tmpBinLhs$143) {
      break loopStop$1;
    } else {
      const g = $dotCall($array_shift, main_data_arr, `shift`);
      $dotCall($array_push, main_data_arr, `push`, g);
    }
  } catch (_0x17f097$1) {
    const h = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, h);
  }
}
$(main_data_arr);
`````


## Settled


`````js filename=intro
const main_data_arr /*:array*/ /*truthy*/ = [`LmNvbmNhdC`, `eBestCandi`, ` using the`, `ike there `, `wgcCwgZikg`];
$(main_data_arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`LmNvbmNhdC`, `eBestCandi`, ` using the`, `ike there `, `wgcCwgZikg`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "LmNvbmNhdC", "eBestCandi", " using the", "ike there ", "wgcCwgZikg" ];
$( a );
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
loopStop$1: {
  try {
    let tmpCalleeParam = the_scf_alias(4639);
    const tmpUnaryArg$6 = $Number_parseInt(tmpCalleeParam);
    let tmpCalleeParam$1 = the_scf_alias(710);
    const tmpBinLhs$166 = $Number_parseInt(tmpCalleeParam$1);
    const tmpIfTest = tmpUnaryArg$6 + tmpBinLhs$166;
    if (tmpIfTest) {
      break loopStop$1;
    } else {
      const e = $dotCall($array_shift, main_data_arr, `shift`);
      $dotCall($array_push, main_data_arr, `push`, e);
    }
  } catch (_0x17f097) {
    const f = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, f);
  }
  try {
    let tmpCalleeParam$3 = the_scf_alias(4639);
    const tmpUnaryArg$12 = $Number_parseInt(tmpCalleeParam$3);
    let tmpCalleeParam$5 = the_scf_alias(710);
    const tmpBinLhs$143 = $Number_parseInt(tmpCalleeParam$5);
    const tmpIfTest$1 = tmpUnaryArg$12 + tmpBinLhs$143;
    if (tmpIfTest$1) {
      break loopStop$1;
    } else {
      const g = $dotCall($array_shift, main_data_arr, `shift`);
      $dotCall($array_push, main_data_arr, `push`, g);
    }
  } catch (_0x17f097$1) {
    const h = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, h);
  }
}
$(main_data_arr);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) maybe we can inline a primitive into a frfr that is called multiple times, too?
- (todo) outline any args for tdz
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Number_parseInt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['LmNvbmNhdC', 'eBestCandi', ' using the', 'ike there ', 'wgcCwgZikg']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
