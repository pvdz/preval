# Preval test case

# both_true_if_false.md

> Ifelse > Back2back > Both true if false
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(true, 'a');
if (x) {
  $(x, 'A');
  x = $(false, 'b');
} else {
  $(x, 'B');
  x = $(false, 'b');
}
if (x) {
  $(x, 'hit');
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(true, `a`);
if (x) {
  $(x, `A`);
  x = $(false, `b`);
} else {
  $(x, `B`);
  x = $(false, `b`);
}
if (x) {
  $(x, `hit`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(true, `a`);
if (x) {
  $(x, `A`);
  x = $(false, `b`);
} else {
  $(x, `B`);
  x = $(false, `b`);
}
if (x) {
  $(x, `hit`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( true, "a" );
if (a) {
  $( a, "A" );
  a = $( false, "b" );
}
else {
  $( a, "B" );
  a = $( false, "b" );
}
if (a) {
  $( a, "hit" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, 'a'
 - 2: true, 'A'
 - 3: false, 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
