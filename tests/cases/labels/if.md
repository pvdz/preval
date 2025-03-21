# Preval test case

# if.md

> Labels > If
>
> Make sure the labeled `if` doesn't screw up transforms

## Input

`````js filename=intro
let x = $(100);
$(0);
foo: if (x) {
  $(1);
  break foo;
}
$(2);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(100);
$(0);
if (x) {
  $(1);
  $(2);
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(100);
$(0);
if (x) {
  $(1);
  $(2);
} else {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( 0 );
if (a) {
  $( 1 );
  $( 2 );
}
else {
  $( 2 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 1
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
