# Preval test case

# both_false_else_true.md

> Ifelse > Back2back > Both false else true
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(false);
if (x) {
  $(x, 'A');
  x = $(true);
} else {
  $(x, 'B');
  x = $(true);
}
if (x) {
} else {
  $(x, 'hit');
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(false);
if (x) {
  $(x, `A`);
  x = $(true);
} else {
  $(x, `B`);
  x = $(true);
}
if (x) {
} else {
  $(x, `hit`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(false);
if (x) {
  $(x, `A`);
  x = $(true);
} else {
  $(x, `B`);
  x = $(true);
}
if (!x) {
  $(x, `hit`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( false );
if (a) {
  $( a, "A" );
  a = $( true );
}
else {
  $( a, "B" );
  a = $( true );
}
if (a) {

}
else {
  $( a, "hit" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(false);
if (x) {
  $(x, `A`);
  x = $(true);
} else {
  $(x, `B`);
  x = $(true);
}
if (x) {
} else {
  $(x, `hit`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: false, 'B'
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
