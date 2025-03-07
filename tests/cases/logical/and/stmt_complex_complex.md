# Preval test case

# stmt_complex_complex.md

> Logical > And > Stmt complex complex
>
> Logical ops need to be normalized

## Input

`````js filename=intro
$(1) && $(2);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(2);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(2);
}
`````

## Pre Normal


`````js filename=intro
$(1) && $(2);
`````

## Normalized


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(2);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
