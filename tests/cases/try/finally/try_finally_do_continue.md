# Preval test case

# try_finally_do_continue.md

> Try > Finally > Try finally do continue
>
> Finally transform checks

## Input

`````js filename=intro
do {
  try {
    $(1);
  } finally {
    $(2);
    continue;
  }
} while ($LOOP_NO_UNROLLS_LEFT)
$(3);
`````


## Settled


`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  try {
    $(1);
  } catch ($finalImplicit) {}
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  try {
    $(1);
  } catch ($finalImplicit) {}
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  try {
    $( 1 );
  }
  catch (a) {

  }
  $( 2 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  try {
    $(1);
  } catch ($finalImplicit) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit;
  }
  $(2);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) this implies a bug and we should prevent it; o


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 2
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
