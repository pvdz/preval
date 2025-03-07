# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > For a > Auto ident cond s-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)); ; $(1));
$(a);
`````

## Settled


`````js filename=intro
$(60);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(60);
while (true) {
  $(1);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  a = (10, 20, 30) ? (40, 50, $(60)) : $($(100));
  while (true) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(60);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
while (true) {
  $(1);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 60 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 60
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
