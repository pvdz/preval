# Preval test case

# empty_empty_set.md

> Normalize > For > Regular > Empty empty set
>
> Regular for-loop

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
for (; ; c) $(d);
`````


## Settled


`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  $(4);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(4);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  $( 4 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
while (true) {
  $(d);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - 2: 4
 - 3: 4
 - 4: 4
 - 5: 4
 - 6: 4
 - 7: 4
 - 8: 4
 - 9: 4
 - 10: 4
 - 11: 4
 - 12: 4
 - 13: 4
 - 14: 4
 - 15: 4
 - 16: 4
 - 17: 4
 - 18: 4
 - 19: 4
 - 20: 4
 - 21: 4
 - 22: 4
 - 23: 4
 - 24: 4
 - 25: 4
 - 26: 4
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
