# Preval test case

# bool_chain.md

> Ai > Ai5 > Bool chain
>
> Test boolean chain simplification

## Input

`````js filename=intro
const x = $(1);
const y = $(2);
let result = 0;

if (x === 1) {
    $(1);  // Track first condition
    if (y === 2) {
        $(2);  // Track second condition
        if (x === 1) {  // Redundant check
            $(3);  // Track redundant check
            result = 1;
        }
    }
} else {
    $(4);  // Track else branch
}

$(result);

// Expected:
// const x = $(1);
// const y = $(2);
// let result = 0;
// if (x === 1 && y === 2) {
//     $(1);
//     $(2);
//     result = 1;  // Redundant check should be eliminated
// } else {
//     $(4);
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const y /*:unknown*/ = $(2);
const tmpIfTest /*:boolean*/ = x === 1;
if (tmpIfTest) {
  $(1);
  const tmpIfTest$1 /*:boolean*/ = y === 2;
  if (tmpIfTest$1) {
    $(2);
    $(3);
    $(1);
  } else {
    $(0);
  }
} else {
  $(4);
  $(0);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
const y = $(2);
if (x === 1) {
  $(1);
  if (y === 2) {
    $(2);
    $(3);
    $(1);
  } else {
    $(0);
  }
} else {
  $(4);
  $(0);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a === 1;
if (c) {
  $( 1 );
  const d = b === 2;
  if (d) {
    $( 2 );
    $( 3 );
    $( 1 );
  }
  else {
    $( 0 );
  }
}
else {
  $( 4 );
  $( 0 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1);
const y = $(2);
let result = 0;
const tmpIfTest = x === 1;
if (tmpIfTest) {
  $(1);
  const tmpIfTest$1 = y === 2;
  if (tmpIfTest$1) {
    $(2);
    const tmpIfTest$3 = x === 1;
    if (tmpIfTest$3) {
      $(3);
      result = 1;
      $(result);
    } else {
      $(result);
    }
  } else {
    $(result);
  }
} else {
  $(4);
  $(result);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 3
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
