# Preval test case

# both_true_else_true.md

> Ifelse > Back2back > Both true else true
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(1);
if (x) {
  $(x, 'A');
  x = $(1);
} else {
  $(x, 'B');
  x = $(1);
}
if (x) {
} else {
  $(x, 'hit');
}
`````

## Settled


`````js filename=intro
let x /*:unknown*/ = $(1);
if (x) {
  $(x, `A`);
  x = $(1);
} else {
  $(x, `B`);
  x = $(1);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(1);
if (x) {
  $(x, `A`);
  x = $(1);
} else {
  $(x, `B`);
  x = $(1);
}
if (!x) {
  $(x, `hit`);
}
`````

## Pre Normal


`````js filename=intro
let x = $(1);
if (x) {
  $(x, `A`);
  x = $(1);
} else {
  $(x, `B`);
  x = $(1);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## Normalized


`````js filename=intro
let x = $(1);
if (x) {
  $(x, `A`);
  x = $(1);
} else {
  $(x, `B`);
  x = $(1);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = $( 1 );
if (a) {
  $( a, "A" );
  a = $( 1 );
}
else {
  $( a, "B" );
  a = $( 1 );
}
if (a) {

}
else {
  $( a, "hit" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1, 'A'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
