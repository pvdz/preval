# Preval test case

# let_write_loop.md

> Ref tracking > Last write analysis > Let write loop
>
> The init to a should be replaced with undefined

## Input

`````js filename=intro
const useless = new $(1);
let simplifyMe = useless;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmp = $(1);
  simplifyMe = tmp;
  if (simplifyMe) {
    break;
  }
}
$(simplifyMe);
`````

## Settled


`````js filename=intro
new $(1);
let simplifyMe /*:unknown*/ = undefined;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmp /*:unknown*/ = $(1);
  simplifyMe = tmp;
  if (tmp) {
    break;
  } else {
  }
}
$(simplifyMe);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
new $(1);
let simplifyMe = undefined;
while (true) {
  $(100);
  const tmp = $(1);
  simplifyMe = tmp;
  if (tmp) {
    break;
  }
}
$(simplifyMe);
`````

## Pre Normal


`````js filename=intro
const useless = new $(1);
let simplifyMe = useless;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmp = $(1);
  simplifyMe = tmp;
  if (simplifyMe) {
    break;
  }
}
$(simplifyMe);
`````

## Normalized


`````js filename=intro
const useless = new $(1);
let simplifyMe = useless;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmp = $(1);
  simplifyMe = tmp;
  if (simplifyMe) {
    break;
  } else {
  }
}
$(simplifyMe);
`````

## PST Settled
With rename=true

`````js filename=intro
new $( 1 );
let a = undefined;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const b = $( 1 );
  a = b;
  if (b) {
    break;
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Support this node type in isFree: NewExpression
