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
const arrB /*:array*/ /*truthy*/ = [
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
  const arrval /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arrB, `shift`);
  $dotCall($array_push, arrB, `push`, arrval);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
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
  $dotCall($array_push, arrB, `push`, $dotCall($array_shift, arrB, `shift`));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "body", "abOPIoHFut:bwlFaSsnkTXHOCpGGeeFsJMHCLEPCWr", "return (function() ", "iframe", "[?&]", "translate(-50%, -50%) scale(", "url", "1362209nkUUHI", "replace" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "protect" );
  const b = $dotCall( $array_shift, a, "shift" );
  $dotCall( $array_push, a, "push", b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`protect`);
  const a = arrB[51];
  const aint = $Number_parseInt(a);
  const b = arrB[18];
  const bint = $Number_parseInt(b);
  const a1 = aint / 1;
  const b2 = bint / 2;
  const ab = a1 * b2;
  const abeq = ab === 712261;
  if (abeq) {
    break;
  } else {
    try {
      const tmpMCF = arrB.shift;
      const arrval = $dotCall(tmpMCF, arrB, `shift`);
      const tmpMCF$1 = arrB.push;
      $dotCall(tmpMCF$1, arrB, `push`, arrval);
    } catch (_0x22a091) {
      const tmpMCF$3 = arrB.shift;
      const ignoreval = $dotCall(tmpMCF$3, arrB, `shift`);
      const tmpMCF$5 = arrB.push;
      $dotCall(tmpMCF$5, arrB, `push`, ignoreval);
    }
  }
}
let tmpCalleeParam = arrB[0];
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_shift
- (todo) phase1_1 support this array method call? tmpMCF
- (todo) type trackeed tricks can possibly support static $Number_parseInt


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
