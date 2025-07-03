# Preval test case

# unroll_option_too_low_10.md

> Unwind loops > Counter test > Unroll option too low 10
>
> Should be able to raise the amount of loop unrolls

## Options

- unroll=15

## Input

`````js filename=intro
const arr = [`a`,`b`,`c`,];
let counter = 10;
while (counter) {
  const e = arr.shift();
  arr.push(e);
  counter = counter - 1;
}
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [`a`, `b`, `c`];
let counter = 10;
while (true) {
  if (counter) {
    const tmpMCF = arr.shift;
    const e = $dotCall(tmpMCF, arr, `shift`);
    const tmpMCF$1 = arr.push;
    $dotCall(tmpMCF$1, arr, `push`, e);
    counter = counter - 1;
  } else {
    break;
  }
}
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_shift


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
