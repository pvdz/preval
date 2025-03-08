# Preval test case

# ident_sequence_simple.md

> Normalize > Binding > Stmt-global-block > Ident sequence simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
if ($(true)) {
  let b = 2, c = 3;
  let a = ($(b), c);
  $(a, b, c);
}
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(2);
  $(3, 2, 3);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(2);
  $(3, 2, 3);
}
`````

## Pre Normal


`````js filename=intro
if ($(true)) {
  let b = 2,
    c = 3;
  let a = ($(b), c);
  $(a, b, c);
}
`````

## Normalized


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = 2;
  let c = 3;
  $(b);
  let a = c;
  $(c, b, c);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 2 );
  $( 3, 2, 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 2
 - 3: 3, 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
