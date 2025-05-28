# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > For let > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let xyz = (a = --b); ; $(1)) $(xyz);
$(a, b);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(0);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(0);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 0 );
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent - 1;
a = b;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
`````


## Todos triggered


- (todo) we can still proceed with the loop as long as there is no let-write anywhere in the loop, inc nested


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 0
 - 4: 1
 - 5: 0
 - 6: 1
 - 7: 0
 - 8: 1
 - 9: 0
 - 10: 1
 - 11: 0
 - 12: 1
 - 13: 0
 - 14: 1
 - 15: 0
 - 16: 1
 - 17: 0
 - 18: 1
 - 19: 0
 - 20: 1
 - 21: 0
 - 22: 1
 - 23: 0
 - 24: 1
 - 25: 0
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
