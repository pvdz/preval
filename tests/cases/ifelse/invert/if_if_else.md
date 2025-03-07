# Preval test case

# if_if_else.md

> Ifelse > Invert > If if else
>
> Test else-matching

The first `if` should not be paired with an `else` after the transformations.

## Input

`````js filename=intro
if (!$(1)) 
  if ($(2)) $(3);
  else $(4);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
} else {
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    $(3);
  } else {
    $(4);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(1)) {
  if ($(2)) {
    $(3);
  } else {
    $(4);
  }
}
`````

## Pre Normal


`````js filename=intro
if (!$(1))
  if ($(2)) $(3);
  else $(4);
`````

## Normalized


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    $(3);
  } else {
    $(4);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {

}
else {
  const b = $( 2 );
  if (b) {
    $( 3 );
  }
  else {
    $( 4 );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
