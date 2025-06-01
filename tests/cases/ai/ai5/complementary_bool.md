# Preval test case

# complementary_bool.md

> Ai > Ai5 > Complementary bool
>
> Test complementary boolean chain

## Input

`````js filename=intro
const x = $(1);
const y = $(2);
let result = 0;

if (x === 1 && y === 2) {
    $(1);  // Track first condition
    result = 1;
} else if (x === 1 && y !== 2) {  // Can be simplified
    $(2);  // Track second condition
    result = 2;
} else {
    $(3);  // Track else branch
}

$(result);

// Expected:
// const x = $(1);
// const y = $(2);
// let result = 0;
// if (x === 1) {
//     if (y === 2) {
//         $(1);
//         result = 1;
//     } else {
//         $(2);
//         result = 2;
//     }
// } else {
//     $(3);
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const y /*:unknown*/ = $(2);
let tmpIfTest /*:boolean*/ = x === 1;
if (tmpIfTest) {
  tmpIfTest = y === 2;
} else {
}
if (tmpIfTest) {
  $(1);
  $(1);
} else {
  const tmpIfTest$1 /*:boolean*/ = x === 1;
  if (tmpIfTest$1) {
    const tmpClusterSSA_tmpIfTest$1 /*:boolean*/ = y === 2;
    if (tmpClusterSSA_tmpIfTest$1) {
      $(3);
      $(0);
    } else {
      $(2);
      $(2);
    }
  } else {
    $(3);
    $(0);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
const y = $(2);
let tmpIfTest = x === 1;
if (tmpIfTest) {
  tmpIfTest = y === 2;
}
if (tmpIfTest) {
  $(1);
  $(1);
} else {
  if (x === 1) {
    if (y === 2) {
      $(3);
      $(0);
    } else {
      $(2);
      $(2);
    }
  } else {
    $(3);
    $(0);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
let c = a === 1;
if (c) {
  c = b === 2;
}
if (c) {
  $( 1 );
  $( 1 );
}
else {
  const d = a === 1;
  if (d) {
    const e = b === 2;
    if (e) {
      $( 3 );
      $( 0 );
    }
    else {
      $( 2 );
      $( 2 );
    }
  }
  else {
    $( 3 );
    $( 0 );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1);
const y = $(2);
let result = 0;
let tmpIfTest = x === 1;
if (tmpIfTest) {
  tmpIfTest = y === 2;
} else {
}
if (tmpIfTest) {
  $(1);
  result = 1;
  $(result);
} else {
  let tmpIfTest$1 = x === 1;
  if (tmpIfTest$1) {
    tmpIfTest$1 = y !== 2;
    if (tmpIfTest$1) {
      $(2);
      result = 2;
      $(result);
    } else {
      $(3);
      $(result);
    }
  } else {
    $(3);
    $(result);
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
 - 2: 2
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
