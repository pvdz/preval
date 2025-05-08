# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Statement > For b > Auto ident arr pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (; ([x, y] = [$(3), $(4)]); $(1));
$(a, x, y);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(3);
  $(4);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(3);
  $(4);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 3 );
  $( 4 );
  $( 1 );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 1
 - 4: 3
 - 5: 4
 - 6: 1
 - 7: 3
 - 8: 4
 - 9: 1
 - 10: 3
 - 11: 4
 - 12: 1
 - 13: 3
 - 14: 4
 - 15: 1
 - 16: 3
 - 17: 4
 - 18: 1
 - 19: 3
 - 20: 4
 - 21: 1
 - 22: 3
 - 23: 4
 - 24: 1
 - 25: 3
 - 26: 4
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
