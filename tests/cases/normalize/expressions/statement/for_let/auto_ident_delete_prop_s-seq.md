# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Statement > For let > Auto ident delete prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (let xyz = delete ($(1), $(2), arg).y; ; $(1)) $(xyz);
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(2);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(true);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
while (true) {
  $(true);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( true );
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = arg;
let xyz = delete tmpDeleteObj.y;
while (true) {
  $(xyz);
  $(1);
}
`````


## Todos triggered


- (todo) regular property access of an ident feels tricky;
- (todo) support delete in free loop?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true
 - 4: 1
 - 5: true
 - 6: 1
 - 7: true
 - 8: 1
 - 9: true
 - 10: 1
 - 11: true
 - 12: 1
 - 13: true
 - 14: 1
 - 15: true
 - 16: 1
 - 17: true
 - 18: 1
 - 19: true
 - 20: 1
 - 21: true
 - 22: 1
 - 23: true
 - 24: 1
 - 25: true
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
