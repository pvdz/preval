# Preval test case

# const_hoist.md

> Ai > Ai5 > Const hoist
>
> Test nested const hoisting

## Input

`````js filename=intro
const x = $(6);
let result = 0;

if (x > 5) {
    $(1);  // Track outer condition
    if (x > 4) {  // Always true
        $(2);  // Track inner condition
        result = 1;
    }
} else {
    $(3);  // Track else branch
}

$(result);

// Expected:
// const x = $(6);
// let result = 0;
// if (x > 5) {
//     $(1);
//     $(2);
//     result = 1;  // Inner condition eliminated
// } else {
//     $(3);
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(6);
const tmpIfTest /*:boolean*/ = x > 5;
if (tmpIfTest) {
  $(1);
  const tmpIfTest$1 /*:boolean*/ = x > 4;
  if (tmpIfTest$1) {
    $(2);
    $(1);
  } else {
    $(0);
  }
} else {
  $(3);
  $(0);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(6);
if (x > 5) {
  $(1);
  if (x > 4) {
    $(2);
    $(1);
  } else {
    $(0);
  }
} else {
  $(3);
  $(0);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 6 );
const b = a > 5;
if (b) {
  $( 1 );
  const c = a > 4;
  if (c) {
    $( 2 );
    $( 1 );
  }
  else {
    $( 0 );
  }
}
else {
  $( 3 );
  $( 0 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(6);
let result = 0;
const tmpIfTest = x > 5;
if (tmpIfTest) {
  $(1);
  const tmpIfTest$1 = x > 4;
  if (tmpIfTest$1) {
    $(2);
    result = 1;
    $(result);
  } else {
    $(result);
  }
} else {
  $(3);
  $(result);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 6
 - 2: 1
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
