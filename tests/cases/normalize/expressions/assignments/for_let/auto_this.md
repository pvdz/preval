# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > For let > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = this); ; $(1)) $(xyz);
$(a);
`````

## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(undefined);
  $(1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(undefined);
  $(1);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (a = undefined);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
`````

## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( undefined );
  $( 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: 1
 - 3: undefined
 - 4: 1
 - 5: undefined
 - 6: 1
 - 7: undefined
 - 8: 1
 - 9: undefined
 - 10: 1
 - 11: undefined
 - 12: 1
 - 13: undefined
 - 14: 1
 - 15: undefined
 - 16: 1
 - 17: undefined
 - 18: 1
 - 19: undefined
 - 20: 1
 - 21: undefined
 - 22: 1
 - 23: undefined
 - 24: 1
 - 25: undefined
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check