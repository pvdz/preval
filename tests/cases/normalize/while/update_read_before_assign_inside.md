# Preval test case

# update_read_before_assign_inside.md

> Normalize > While > Update read before assign inside
>
> Testing SSA algo which must be aware that updating a binding in a loop may still be read by the next iteration

## Input

`````js filename=intro
let x = true;
while (true) {
  $(x);
  x = x + 1;
}
$('unreachable');
`````


## Settled


`````js filename=intro
let x /*:primitive*/ = true;
while ($LOOP_NO_UNROLLS_LEFT) {
  $(x);
  x = x + 1;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = true;
while (true) {
  $(x);
  x = x + 1;
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = true;
while ($LOOP_NO_UNROLLS_LEFT) {
  $( a );
  a = a + 1;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = true;
while (true) {
  $(x);
  x = x + 1;
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 5
 - 6: 6
 - 7: 7
 - 8: 8
 - 9: 9
 - 10: 10
 - 11: 11
 - 12: 12
 - 13: 13
 - 14: 14
 - 15: 15
 - 16: 16
 - 17: 17
 - 18: 18
 - 19: 19
 - 20: 20
 - 21: 21
 - 22: 22
 - 23: 23
 - 24: 24
 - 25: 25
 - 26: 26
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
