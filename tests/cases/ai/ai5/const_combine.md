# Preval test case

# const_combine.md

> Ai > Ai5 > Const combine
>
> Test const comparison combination

## Input

`````js filename=intro
const x = $(1);
let result = 0;

if (x === 1) {
    $(1);  // Track first case
    result = 1;
} else if (x === 2) {
    $(2);  // Track second case
    result = 2;
} else if (x === 3) {
    $(3);  // Track third case
    result = 3;
} else {
    $(4);  // Track else case
    result = 4;
}

$(result);

// Expected:
// const x = $(1);
// let result = 0;
// if (x === 1) {
//     $(1);
//     result = 1;
// } else if (x === 2) {
//     $(2);
//     result = 2;
// } else if (x === 3) {
//     $(3);
//     result = 3;
// } else {
//     $(4);
//     result = 4;
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = x === 1;
if (tmpIfTest) {
  $(1);
  $(1);
} else {
  const tmpIfTest$1 /*:boolean*/ = x === 2;
  if (tmpIfTest$1) {
    $(2);
    $(2);
  } else {
    const tmpIfTest$3 /*:boolean*/ = x === 3;
    if (tmpIfTest$3) {
      $(3);
      $(3);
    } else {
      $(4);
      $(4);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if (x === 1) {
  $(1);
  $(1);
} else {
  if (x === 2) {
    $(2);
    $(2);
  } else {
    if (x === 3) {
      $(3);
      $(3);
    } else {
      $(4);
      $(4);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a === 1;
if (b) {
  $( 1 );
  $( 1 );
}
else {
  const c = a === 2;
  if (c) {
    $( 2 );
    $( 2 );
  }
  else {
    const d = a === 3;
    if (d) {
      $( 3 );
      $( 3 );
    }
    else {
      $( 4 );
      $( 4 );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1);
let result = 0;
const tmpIfTest = x === 1;
if (tmpIfTest) {
  $(1);
  result = 1;
  $(result);
} else {
  const tmpIfTest$1 = x === 2;
  if (tmpIfTest$1) {
    $(2);
    result = 2;
    $(result);
  } else {
    const tmpIfTest$3 = x === 3;
    if (tmpIfTest$3) {
      $(3);
      result = 3;
      $(result);
    } else {
      $(4);
      result = 4;
      $(result);
    }
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
