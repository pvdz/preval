# Preval test case

# const_reorder.md

> Ai > Ai5 > Const reorder
>
> Test const comparison reordering

## Input

`````js filename=intro
const x = $(1);
const y = $(2);
const z = $(3);
let result = 0;

if (x === 1 && y === 2 && z === 3) {
    $(1);  // Track combined condition
    result = 1;
} else {
    $(2);  // Track else branch
}

$(result);

// Expected:
// const x = $(1);
// const y = $(2);
// const z = $(3);
// let result = 0;
// if (x === 1) {
//     if (y === 2) {
//         if (z === 3) {
//             $(1);
//             result = 1;
//         }
//     }
// } else {
//     $(2);
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const y /*:unknown*/ = $(2);
const z /*:unknown*/ = $(3);
const tmpIfTest /*:boolean*/ = x === 1;
if (tmpIfTest) {
  const tmpClusterSSA_tmpIfTest /*:boolean*/ = y === 2;
  if (tmpClusterSSA_tmpIfTest) {
    const tmpClusterSSA_tmpIfTest$1 /*:boolean*/ = z === 3;
    if (tmpClusterSSA_tmpIfTest$1) {
      $(1);
      $(1);
    } else {
      $(2);
      $(0);
    }
  } else {
    $(2);
    $(0);
  }
} else {
  $(2);
  $(0);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
const y = $(2);
const z = $(3);
if (x === 1) {
  if (y === 2) {
    if (z === 3) {
      $(1);
      $(1);
    } else {
      $(2);
      $(0);
    }
  } else {
    $(2);
    $(0);
  }
} else {
  $(2);
  $(0);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( 3 );
const d = a === 1;
if (d) {
  const e = b === 2;
  if (e) {
    const f = c === 3;
    if (f) {
      $( 1 );
      $( 1 );
    }
    else {
      $( 2 );
      $( 0 );
    }
  }
  else {
    $( 2 );
    $( 0 );
  }
}
else {
  $( 2 );
  $( 0 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1);
const y = $(2);
const z = $(3);
let result = 0;
let tmpIfTest = x === 1;
if (tmpIfTest) {
  tmpIfTest = y === 2;
  if (tmpIfTest) {
    tmpIfTest = z === 3;
    if (tmpIfTest) {
      $(1);
      result = 1;
      $(result);
    } else {
      $(2);
      $(result);
    }
  } else {
    $(2);
    $(result);
  }
} else {
  $(2);
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
 - 3: 3
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
