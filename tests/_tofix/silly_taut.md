# Preval test case

# silly_taut.md

> Tofix > silly taut
>
> Not sure but found in the wild

The body of the loop is really just

```
const b = a[ NaN ];
const c = $Number_parseInt( b );
$( "testing", b, c );
```
but either way, preval should update the if hoisting reducer to handle this case

## Input

`````js filename=intro
let tmpSealed /*:boolean*/ = false;
const main_data_arr /*:array*/ /*truthy*/ = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let b /*:number*/ /*ternaryConst*/ = 0;
  const tmp2$3 /*:primitive*/ = main_data_arr[NaN];
  if (tmpSealed) {
    b = $Number_parseInt(tmp2$3);
    $(`testing`, tmp2$3, b);
  } else {
    tmpSealed = true;
    b = $Number_parseInt(tmp2$3);
    $(`testing`, tmp2$3, b);
  }
  if (b) {
    break;
  } else {
    const tmpMCPa /*:primitive*/ /*truthy*/ = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
  }
}
const tmp2$1 /*:primitive*/ = main_data_arr[NaN];
$(tmp2$1);
`````


## Settled


`````js filename=intro
let tmpSealed /*:boolean*/ = false;
const main_data_arr /*:array*/ /*truthy*/ = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let b /*:number*/ /*ternaryConst*/ = 0;
  const tmp2$3 /*:primitive*/ = main_data_arr[NaN];
  if (tmpSealed) {
    b = $Number_parseInt(tmp2$3);
    $(`testing`, tmp2$3, b);
  } else {
    tmpSealed = true;
    b = $Number_parseInt(tmp2$3);
    $(`testing`, tmp2$3, b);
  }
  if (b) {
    break;
  } else {
    const tmpMCPa /*:primitive*/ /*truthy*/ = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
  }
}
const tmp2$1 /*:primitive*/ = main_data_arr[NaN];
$(tmp2$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpSealed = false;
const main_data_arr = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
while (true) {
  let b = 0;
  const tmp2$3 = main_data_arr[NaN];
  if (tmpSealed) {
    b = $Number_parseInt(tmp2$3);
    $(`testing`, tmp2$3, b);
  } else {
    tmpSealed = true;
    b = $Number_parseInt(tmp2$3);
    $(`testing`, tmp2$3, b);
  }
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
let a = false;
const b = [ "this", "contents", "is", "not", "relevant", "here" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let c = 0;
  const d = b[ NaN ];
  if (a) {
    c = $Number_parseInt( d );
    $( "testing", d, c );
  }
  else {
    a = true;
    c = $Number_parseInt( d );
    $( "testing", d, c );
  }
  if (c) {
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
let tmpSealed = false;
const main_data_arr = [`this`, `contents`, `is`, `not`, `relevant`, `here`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let b = 0;
  const tmp2$3 = main_data_arr[NaN];
  if (tmpSealed) {
    b = $Number_parseInt(tmp2$3);
    $(`testing`, tmp2$3, b);
  } else {
    tmpSealed = true;
    b = $Number_parseInt(tmp2$3);
    $(`testing`, tmp2$3, b);
  }
  if (b) {
    break;
  } else {
    const tmpMCPa = $dotCall($array_shift, main_data_arr, `shift`);
    $dotCall($array_push, main_data_arr, `push`, tmpMCPa);
  }
}
const tmp2$1 = main_data_arr[NaN];
$(tmp2$1);
`````


## Todos triggered


- (todo) support array reads statement type WhileStatement
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
