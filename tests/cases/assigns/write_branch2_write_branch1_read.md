# Preval test case

# write_branch2_write_branch1_read.md

> Assigns > Write branch2 write branch1 read
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
if ($(10)) {
  if ($(20)) {
    x = $(2);
    $(x);
  }
  $(x); // This means we can't safely eliminate the first write
}
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(10);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(20);
  if (tmpIfTest$1) {
    const tmpClusterSSA_x /*:unknown*/ = $(2);
    $(tmpClusterSSA_x);
    $(tmpClusterSSA_x);
  } else {
    $(x);
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if ($(10)) {
  if ($(20)) {
    const tmpClusterSSA_x = $(2);
    $(tmpClusterSSA_x);
    $(tmpClusterSSA_x);
  } else {
    $(x);
  }
}
`````

## Pre Normal


`````js filename=intro
let x = $(1);
if ($(10)) {
  if ($(20)) {
    x = $(2);
    $(x);
  }
  $(x);
}
`````

## Normalized


`````js filename=intro
let x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  const tmpIfTest$1 = $(20);
  if (tmpIfTest$1) {
    x = $(2);
    $(x);
    $(x);
  } else {
    $(x);
  }
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 10 );
if (b) {
  const c = $( 20 );
  if (c) {
    const d = $( 2 );
    $( d );
    $( d );
  }
  else {
    $( a );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 20
 - 4: 2
 - 5: 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
