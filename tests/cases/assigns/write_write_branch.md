# Preval test case

# write_write_branch.md

> Assigns > Write write branch
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
if ($(10)) x = $(2);
$(x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(10);
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
} else {
  $(x);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if ($(10)) {
  $($(2));
} else {
  $(x);
}
`````

## Pre Normal


`````js filename=intro
let x = $(1);
if ($(10)) x = $(2);
$(x);
`````

## Normalized


`````js filename=intro
let x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  x = $(2);
  $(x);
} else {
  $(x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 10 );
if (b) {
  const c = $( 2 );
  $( c );
}
else {
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
