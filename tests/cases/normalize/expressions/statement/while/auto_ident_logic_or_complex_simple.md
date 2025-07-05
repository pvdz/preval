# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > While > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($($(0)) || 2) $(100);
$(a);
`````


## Settled


`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpCalleeParam /*:unknown*/ = $(0);
  $(tmpCalleeParam);
  $(100);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $($(0));
  $(100);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  const a = $( 0 );
  $( a );
  $( 100 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpCalleeParam = $(0);
  let tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    $(100);
  } else {
    tmpIfTest = 2;
    if (tmpIfTest) {
      $(100);
    } else {
      break;
    }
  }
}
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 100
 - 4: 0
 - 5: 0
 - 6: 100
 - 7: 0
 - 8: 0
 - 9: 100
 - 10: 0
 - 11: 0
 - 12: 100
 - 13: 0
 - 14: 0
 - 15: 100
 - 16: 0
 - 17: 0
 - 18: 100
 - 19: 0
 - 20: 0
 - 21: 100
 - 22: 0
 - 23: 0
 - 24: 100
 - 25: 0
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
