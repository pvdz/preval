# Preval test case

# write_branch2_write_branch2_read.md

> Assigns > Write branch2 write branch2 read
>
> Testing binding mutation optimizations

## Input

`````js filename=intro
let x = $(1);
if ($(10)) {
  if ($(20)) {
    x = $(2);
    $(x); // Since this is the only read, the first write cannot be observed so we can eliminate it
  }
}
`````

## Settled


`````js filename=intro
$(1);
const tmpIfTest /*:unknown*/ = $(10);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(20);
  if (tmpIfTest$1) {
    const tmpClusterSSA_x /*:unknown*/ = $(2);
    $(tmpClusterSSA_x);
  } else {
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
if ($(10)) {
  if ($(20)) {
    $($(2));
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
  } else {
  }
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 10 );
if (a) {
  const b = $( 20 );
  if (b) {
    const c = $( 2 );
    $( c );
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
