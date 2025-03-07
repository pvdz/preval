# Preval test case

# write_branch_write_branch_read.md

> Assigns > Write branch write branch read
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
if ($(10)) {
  x = $(2);
  $(x);
}
`````

## Settled


`````js filename=intro
$(1);
const tmpIfTest /*:unknown*/ = $(10);
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
if ($(10)) {
  $($(2));
}
`````

## Pre Normal


`````js filename=intro
let x = $(1);
if ($(10)) {
  x = $(2);
  $(x);
}
`````

## Normalized


`````js filename=intro
let x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  x = $(2);
  $(x);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 10 );
if (a) {
  const b = $( 2 );
  $( b );
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
