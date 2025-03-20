# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(0)) || 2);
$(a);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCalleeParam /*:unknown*/ = $(0);
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(100);
  $($(0));
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const a = $( 0 );
  $( a );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 100
 - 5: 0
 - 6: 0
 - 7: 100
 - 8: 0
 - 9: 0
 - 10: 100
 - 11: 0
 - 12: 0
 - 13: 100
 - 14: 0
 - 15: 0
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 100
 - 20: 0
 - 21: 0
 - 22: 100
 - 23: 0
 - 24: 0
 - 25: 100
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
