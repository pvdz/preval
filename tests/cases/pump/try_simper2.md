# Preval test case

# try_simper2.md

> Pump > Try simper2
>
> Loop pump with fake try/catch wrapper

## Input

`````js filename=intro
const arrB = [`body`, `abOPIoHFut:bwlFaSsnkTXHOCpGGeeFsJMHCLEPCWr`, `return (function() `, `iframe`, `[?&]`, `translate(-50%, -50%) scale(`, `url`, `1362209nkUUHI`, `replace`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $('protect');
  const abeq = arrB[51] === 712261;
  if (abeq) {
    break;
  } else {
    const arrval = arrB.shift();
    arrB.push(arrval);
  }
}
$(arrB[0]);
`````


## Settled


`````js filename=intro
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
  const tmpBinLhs /*:primitive*/ = arrB[51];
  const abeq /*:boolean*/ = tmpBinLhs === 712261;
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
  if (arrB[51] === 712261) {
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
const a = [ "body", "abOPIoHFut:bwlFaSsnkTXHOCpGGeeFsJMHCLEPCWr", "return (function() ", "iframe", "[?&]", "translate(-50%, -50%) scale(", "url", "1362209nkUUHI", "replace" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "protect" );
  const b = a[ 51 ];
  const c = b === 712261;
  if (c) {
    break;
  }
  else {
    const d = $dotCall( $array_shift, a, "shift" );
    $dotCall( $array_push, a, "push", d );
  }
}
const e = a[ 0 ];
$( e );
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_shift
- (todo) access object property that also exists on prototype? $array_push
- (todo) ExpressionStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) support array reads statement type WhileStatement


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
