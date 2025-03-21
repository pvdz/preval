# Preval test case

# both_true_else_false.md

> Ifelse > Back2back > Both true else false
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(1);
if (x) {
  $(x, 'A');
  x = $(0);
} else {
  $(x, 'B');
  x = $(0);
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
  x = $(0);
} else {
  $(x, `B`);
  x = $(0);
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
  x = $(0);
} else {
  $(x, `B`);
  x = $(0);
}
if (!x) {
  $(x, `hit`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( 1 );
if (a) {
  $( a, "A" );
  a = $( 0 );
}
else {
  $( a, "B" );
  a = $( 0 );
}
if (a) {

}
else {
  $( a, "hit" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1, 'A'
 - 3: 0
 - 4: 0, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
