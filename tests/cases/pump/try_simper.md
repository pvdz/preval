# Preval test case

# try_simper.md

> Pump > Try simper
>
> Loop pump with fake try/catch wrapper

## Input

`````js filename=intro
const arrB = [`body`, `abOPIoHFut:bwlFaSsnkTXHOCpGGeeFsJMHCLEPCWr`, `return (function() `, `iframe`, `[?&]`, `translate(-50%, -50%) scale(`, `url`, `1362209nkUUHI`, `replace`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $('protect');
  const a = arrB[51];
  const aint = parseInt(a);
  const b = arrB[18];
  const bint = parseInt(b);
  const a1 = aint / 1;
  const b2 = bint / 2;
  const ab = a1 * b2;
  const abeq = ab === 712261;
  if (abeq) {
    break;
  } else {
    try {
      const arrval = arrB.shift();
      arrB.push(arrval);
    } catch (_0x22a091) {
      const ignoreval = arrB.shift();
      arrB.push(ignoreval);
    }
  }
}
$(arrB[0]);
`````


## Settled


`````js filename=intro
const tmpFree /*:(number, number)=>boolean*/ = function $free($$0, $$1) {
  const aint /*:number*/ = $$0;
  const bint /*:number*/ = $$1;
  debugger;
  const a1 /*:number*/ = aint / 1;
  const b2 /*:number*/ = bint / 2;
  const ab /*:number*/ = a1 * b2;
  const tmpRet /*:boolean*/ = ab === 712261;
  return tmpRet;
};
const arrB /*:array*/ = [
  `body`,
  `abOPIoHFut:bwlFaSsnkTXHOCpGGeeFsJMHCLEPCWr`,
  `return (function() `,
  `iframe`,
  `[?&]`,
  `translate(-50%, -50%) scale(`,
  `url`,
  `1362209nkUUHI`,
  `replace`,
];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`protect`);
  const a /*:primitive*/ = arrB[51];
  const b /*:primitive*/ = arrB[18];
  const aint$1 /*:number*/ = parseInt(a);
  const bint$1 /*:number*/ = parseInt(b);
  const abeq /*:boolean*/ = $frfr(tmpFree, aint$1, bint$1);
  if (abeq) {
    break;
  } else {
    const arrval /*:primitive*/ = $dotCall($array_shift, arrB, `shift`);
    $dotCall($array_push, arrB, `push`, arrval);
  }
}
const tmpCalleeParam /*:primitive*/ = arrB[0];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(aint, bint) {
  const a1 = aint / 1;
  const tmpRet = a1 * (bint / 2) === 712261;
  return tmpRet;
};
const arrB = [
  `body`,
  `abOPIoHFut:bwlFaSsnkTXHOCpGGeeFsJMHCLEPCWr`,
  `return (function() `,
  `iframe`,
  `[?&]`,
  `translate(-50%, -50%) scale(`,
  `url`,
  `1362209nkUUHI`,
  `replace`,
];
while (true) {
  $(`protect`);
  const a = arrB[51];
  const b = arrB[18];
  if ($frfr(tmpFree, parseInt(a), parseInt(b))) {
    break;
  } else {
    $dotCall($array_push, arrB, `push`, $dotCall($array_shift, arrB, `shift`));
  }
}
$(arrB[0]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = c / 1;
  const f = d / 2;
  const g = e * f;
  const h = g === 712261;
  return h;
};
const i = [ "body", "abOPIoHFut:bwlFaSsnkTXHOCpGGeeFsJMHCLEPCWr", "return (function() ", "iframe", "[?&]", "translate(-50%, -50%) scale(", "url", "1362209nkUUHI", "replace" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "protect" );
  const j = i[ 51 ];
  const k = i[ 18 ];
  const l = parseInt( j );
  const m = parseInt( k );
  const n = o( a, l, m );
  if (n) {
    break;
  }
  else {
    const p = $dotCall( $array_shift, i, "shift" );
    $dotCall( $array_push, i, "push", p );
  }
}
const q = i[ 0 ];
$( q );
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_shift
- (todo) access object property that also exists on prototype? $array_push
- (todo) ExpressionStatement; how else might an array be used that we may want to support in phase1_1?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'protect'
 - 2: 'protect'
 - 3: 'protect'
 - 4: 'protect'
 - 5: 'protect'
 - 6: 'protect'
 - 7: 'protect'
 - 8: 'protect'
 - 9: 'protect'
 - 10: 'protect'
 - 11: 'protect'
 - 12: 'protect'
 - 13: 'protect'
 - 14: 'protect'
 - 15: 'protect'
 - 16: 'protect'
 - 17: 'protect'
 - 18: 'protect'
 - 19: 'protect'
 - 20: 'protect'
 - 21: 'protect'
 - 22: 'protect'
 - 23: 'protect'
 - 24: 'protect'
 - 25: 'protect'
 - 26: 'protect'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
