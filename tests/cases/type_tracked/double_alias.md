# Preval test case

# double_alias.md

> Type tracked > Double alias
>
> First arr[0] is updated and then it is read again. Knowing this is an 
> array we can fold that up safely.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const I_AM_A_PRIM = arr[0];
  const result = I_AM_A_PRIM + 1;
  arr[0] = result;
  const tmp = arr[0]; // eliminate me, replace with `result`
  $(tmp);
}
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const I_AM_A_PRIM /*:primitive*/ = arr[0];
  const result /*:primitive*/ = I_AM_A_PRIM + 1;
  arr[0] = result;
  $(result);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3];
while (true) {
  const result = arr[0] + 1;
  arr[0] = result;
  $(result);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ 0 ];
  const c = b + 1;
  a[0] = c;
  $( c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 4
 - 4: 5
 - 5: 6
 - 6: 7
 - 7: 8
 - 8: 9
 - 9: 10
 - 10: 11
 - 11: 12
 - 12: 13
 - 13: 14
 - 14: 15
 - 15: 16
 - 16: 17
 - 17: 18
 - 18: 19
 - 19: 20
 - 20: 21
 - 21: 22
 - 22: 23
 - 23: 24
 - 24: 25
 - 25: 26
 - 26: 27
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
