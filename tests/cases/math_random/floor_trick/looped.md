# Preval test case

# looped.md

> Math random > Floor trick > Looped
>
>

## Input

`````js filename=intro
while (true) {
  const rnd = Math.random();
  $(rnd);
}
`````


## Settled


`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  const rnd /*:number*/ = $Math_random();
  $(rnd);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $($Math_random());
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  const a = $Math_random();
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  const tmpMCF = $Math_random;
  const rnd = $Math_random();
  $(rnd);
}
`````


## Todos triggered


- (todo) Support this ident in isFree CallExpression: $Math_random
- (todo) type trackeed tricks can possibly support static $Math_random


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.12556649118791485
 - 2: 0.5391927977416647
 - 3: 0.23569085221637293
 - 4: 0.8002746623941406
 - 5: 0.20585946440833142
 - 6: 0.3657892729076066
 - 7: 0.3593957427328908
 - 8: 0.9454489967193103
 - 9: 0.21843289845120928
 - 10: 0.3760891126878767
 - 11: 0.5479056992446785
 - 12: 0.6704203860532539
 - 13: 0.6547035934996567
 - 14: 0.19478141451132983
 - 15: 0.08340581368734264
 - 16: 0.3548180361638819
 - 17: 0.41699855039291983
 - 18: 0.1373769741359579
 - 19: 0.38962386511024644
 - 20: 0.2653238727397574
 - 21: 0.7998626688029298
 - 22: 0.9864194705119402
 - 23: 0.045090409704737926
 - 24: 0.9470969710841535
 - 25: 0.349080643930724
 - 26: 0.8336461432822156
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
