# Preval test case

# empty_in_loop.md

> Obj mutation > Empty in loop
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
while (true) {
  blob.thing = 'boing';
  $(1);
}
$(blob);

`````


## Settled


`````js filename=intro
const blob /*:object*/ /*truthy*/ = { thing: `boing` };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  blob.thing = `boing`;
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const blob = { thing: `boing` };
while (true) {
  blob.thing = `boing`;
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { thing: "boing" };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  a.thing = "boing";
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const blob = { thing: `woop` };
while (true) {
  blob.thing = `boing`;
  $(1);
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
