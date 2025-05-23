# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $($(0)) || 2); $(1));
$(a);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam /*:unknown*/ = $(0);
  $(tmpCalleeParam);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $($(0));
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $( 0 );
  $( a );
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
  } else {
    a = 2;
  }
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 0
 - 5: 0
 - 6: 1
 - 7: 0
 - 8: 0
 - 9: 1
 - 10: 0
 - 11: 0
 - 12: 1
 - 13: 0
 - 14: 0
 - 15: 1
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 0
 - 20: 0
 - 21: 1
 - 22: 0
 - 23: 0
 - 24: 1
 - 25: 0
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
