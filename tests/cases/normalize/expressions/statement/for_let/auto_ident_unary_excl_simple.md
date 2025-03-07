# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Statement > For let > Auto ident unary excl simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for (let xyz = !arg; ; $(1)) $(xyz);
$(a, arg);
`````

## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(false);
  $(1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(false);
  $(1);
}
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
{
  let xyz = !arg;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let xyz = !arg;
while (true) {
  $(xyz);
  $(1);
}
`````

## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( false );
  $( 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false
 - 2: 1
 - 3: false
 - 4: 1
 - 5: false
 - 6: 1
 - 7: false
 - 8: 1
 - 9: false
 - 10: 1
 - 11: false
 - 12: 1
 - 13: false
 - 14: 1
 - 15: false
 - 16: 1
 - 17: false
 - 18: 1
 - 19: false
 - 20: 1
 - 21: false
 - 22: 1
 - 23: false
 - 24: 1
 - 25: false
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
- Support this node type as init in isFree: