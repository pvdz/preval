# Preval test case

# while_if_double_break.md

> Tofix > while if double break
>
> If both branches break then the loop doesn't loop, eh.
> Need to solve this in a generic way

## Input

`````js filename=intro
$(`start`);
oops: {
  const x = $(1);
  while (true) {
    if (x) {
      $(2);
      break oops;
    } else {
      $(3);
      break;
    }
  }
}
$('end');
`````

## Settled


`````js filename=intro
$(`start`);
const x /*:unknown*/ = $(1);
if (x) {
  $(2);
} else {
  $(3);
}
$(`end`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`start`);
if ($(1)) {
  $(2);
} else {
  $(3);
}
$(`end`);
`````

## Pre Normal


`````js filename=intro
$(`start`);
oops: {
  const x = $(1);
  while (true) {
    if (x) {
      $(2);
      break oops;
    } else {
      $(3);
      break;
    }
  }
}
$(`end`);
`````

## Normalized


`````js filename=intro
$(`start`);
const x = $(1);
while (true) {
  if (x) {
    $(2);
    break;
  } else {
    $(3);
    break;
  }
}
$(`end`);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "start" );
const a = $( 1 );
if (a) {
  $( 2 );
}
else {
  $( 3 );
}
$( "end" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'start'
 - 2: 1
 - 3: 2
 - 4: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
