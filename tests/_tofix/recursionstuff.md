# Preval test case

# recursionstuff.md

> Tofix > recursionstuff

The recursive call of selfcaller(0) does not appear to pick up on the fact that the arg must be a number.

The problem is that the recursive call is processed before the outer call, so the parameter never gets a chance to pop off as
a number. As a result the recursive call passes on primitive, which is fine and will be the repeat case indefinitely.

## Input

`````js filename=intro
const tmpFree1/*:(primitive)=>string*/ = function $free($$0) {
  const _0x5249c7/*:primitive*/ = $$0;
  debugger;
  const tmpBinBothRhs$1/*:number*/ = _0x5249c7 / _0x5249c7;
  const tmpRet/*:string*/ = $coerce(tmpBinBothRhs$1, `string`);
  return tmpRet;
};
const tmpFree2/*:(primitive)=>boolean*/ = function $free($$0) {
  const _0x5249c7$1/*:primitive*/ = $$0;
  debugger;
  const tmpBinBothLhs/*:string*/ = typeof _0x5249c7$1;
  const tmpRet$2/*:boolean*/ = tmpBinBothLhs === `string`;
  return tmpRet$2;
};
const selfcaller/*:(primitive)=>undefined*/ = function($$0) {
  const arg_is_number/*:primitive*/ = $$0;
  debugger;
  $(arg_is_number);
  const tmpIfTest/*:boolean*/ = $frfr(tmpFree2, arg_is_number);
  if (tmpIfTest) {
    return undefined;
  } else {
    const okstring/*:string*/ = $frfr(tmpFree1, arg_is_number);
    const nextnum/*:primitive*/ = arg_is_number + 1;
    selfcaller(nextnum);                                            // <-- this one is processed before the outer call leading to primitive arg
    return undefined;
  }
};
try {
  selfcaller(0);
  $('pass');
} catch (e) {
  $('fail');
}
`````

## Settled


`````js filename=intro
const tmpFree2 /*:(primitive)=>boolean*/ = function $free($$0) {
  const $dlr_$$1 /*:primitive*/ = $$0;
  debugger;
  const tmpBinBothLhs /*:string*/ = typeof $dlr_$$1;
  const tmpRet$2 /*:boolean*/ = tmpBinBothLhs === `string`;
  return tmpRet$2;
};
const selfcaller /*:(primitive)=>undefined*/ = function ($$0) {
  const $dlr_$$3 /*:primitive*/ = $$0;
  debugger;
  $($dlr_$$3);
  const tmpIfTest /*:boolean*/ = $frfr(tmpFree2, $dlr_$$3);
  if (tmpIfTest) {
    return undefined;
  } else {
    const nextnum /*:primitive*/ = $dlr_$$3 + 1;
    selfcaller(nextnum);
    return undefined;
  }
};
try {
  selfcaller(0);
  $(`pass`);
} catch (e) {
  $(`fail`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree2 = function $free($dlr_$$1) {
  const tmpRet$2 = typeof $dlr_$$1 === `string`;
  return tmpRet$2;
};
const selfcaller = function ($dlr_$$3) {
  $($dlr_$$3);
  const tmpIfTest = $frfr(tmpFree2, $dlr_$$3);
  if (!tmpIfTest) {
    selfcaller($dlr_$$3 + 1);
  }
};
try {
  selfcaller(0);
  $(`pass`);
} catch (e) {
  $(`fail`);
}
`````

## Pre Normal


`````js filename=intro
const tmpFree1 = function $free($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const _0x5249c7 = $dlr_$$0;
  const tmpBinBothRhs$1 = _0x5249c7 / _0x5249c7;
  const tmpRet = $coerce(tmpBinBothRhs$1, `string`);
  return tmpRet;
};
const tmpFree2 = function $free($$0) {
  let $dlr_$$1 = $$0;
  debugger;
  const _0x5249c7$1 = $dlr_$$1;
  const tmpBinBothLhs = typeof _0x5249c7$1;
  const tmpRet$2 = tmpBinBothLhs === `string`;
  return tmpRet$2;
};
const selfcaller = function ($$0) {
  let $dlr_$$3 = $$0;
  debugger;
  const arg_is_number = $dlr_$$3;
  $(arg_is_number);
  const tmpIfTest = $frfr(tmpFree2, arg_is_number);
  if (tmpIfTest) {
    return undefined;
  } else {
    const okstring = $frfr(tmpFree1, arg_is_number);
    const nextnum = arg_is_number + 1;
    selfcaller(nextnum);
    return undefined;
  }
};
try {
  selfcaller(0);
  $(`pass`);
} catch (e) {
  $(`fail`);
}
`````

## Normalized


`````js filename=intro
const tmpFree1 = function $free($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const _0x5249c7 = $dlr_$$0;
  const tmpBinBothRhs$1 = _0x5249c7 / _0x5249c7;
  const tmpRet = $coerce(tmpBinBothRhs$1, `string`);
  return tmpRet;
};
const tmpFree2 = function $free($$0) {
  let $dlr_$$1 = $$0;
  debugger;
  const _0x5249c7$1 = $dlr_$$1;
  const tmpBinBothLhs = typeof _0x5249c7$1;
  const tmpRet$2 = tmpBinBothLhs === `string`;
  return tmpRet$2;
};
const selfcaller = function ($$0) {
  let $dlr_$$3 = $$0;
  debugger;
  const arg_is_number = $dlr_$$3;
  $(arg_is_number);
  const tmpIfTest = $frfr(tmpFree2, arg_is_number);
  if (tmpIfTest) {
    return undefined;
  } else {
    const okstring = $frfr(tmpFree1, arg_is_number);
    const nextnum = arg_is_number + 1;
    selfcaller(nextnum);
    return undefined;
  }
};
try {
  selfcaller(0);
  $(`pass`);
} catch (e) {
  $(`fail`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = typeof c;
  const e = d === "string";
  return e;
};
const f = function($$0 ) {
  const g = $$0;
  debugger;
  $( g );
  const h = i( a, g );
  if (h) {
    return undefined;
  }
  else {
    const j = g + 1;
    f( j );
    return undefined;
  }
};
try {
  f( 0 );
  $( "pass" );
}
catch (k) {
  $( "fail" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: 5
 - 7: 6
 - 8: 7
 - 9: 8
 - 10: 9
 - 11: 10
 - 12: 11
 - 13: 12
 - 14: 13
 - 15: 14
 - 16: 15
 - 17: 16
 - 18: 17
 - 19: 18
 - 20: 19
 - 21: 20
 - 22: 21
 - 23: 22
 - 24: 23
 - 25: 24
 - 26: 25
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
