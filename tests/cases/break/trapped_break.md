# Preval test case

# trapped_break.md

> Break > Trapped break
>
> Breaks can't possibly throw so the try is dead code

## Input

`````js filename=intro
let x = $(1);
lab: {
  if (x < 0) {
    break lab;
  }
  if (x === 1) {
    try {
      break lab;
    } catch (e) {
      $('ded');
    }
  }
  x = 2;
}
$(x); // x=1
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = x < 0;
if (tmpIfTest) {
  $(x);
} else {
  const tmpIfTest$1 /*:boolean*/ = x === 1;
  if (tmpIfTest$1) {
    $(1);
  } else {
    $(2);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if (x < 0) {
  $(x);
} else {
  if (x === 1) {
    $(1);
  } else {
    $(2);
  }
}
`````

## Pre Normal


`````js filename=intro
let x = $(1);
lab: {
  if (x < 0) {
    break lab;
  }
  if (x === 1) {
    try {
      break lab;
    } catch (e) {
      $(`ded`);
    }
  }
  x = 2;
}
$(x);
`````

## Normalized


`````js filename=intro
let x = $(1);
lab: {
  const tmpIfTest = x < 0;
  if (tmpIfTest) {
    break lab;
  } else {
    const tmpIfTest$1 = x === 1;
    if (tmpIfTest$1) {
      break lab;
    } else {
      x = 2;
    }
  }
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a < 0;
if (b) {
  $( a );
}
else {
  const c = a === 1;
  if (c) {
    $( 1 );
  }
  else {
    $( 2 );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
