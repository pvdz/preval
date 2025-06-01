# Preval test case

# const_loop_hoist.md

> Ai > Ai5 > Const loop hoist
>
> Test const comparison hoisting from loops

## Input

`````js filename=intro
const x = $(1);
let i = 0;
let result = 0;

while (i < 3) {
    $(i);  // Track loop iteration
    if (x === 1) {  // Same check every iteration
        $(1);  // Track condition
        result = 1;
    }
    i = i + 1;
}

$(result);

// Expected:
// const x = $(1);
// let i = 0;
// let result = 0;
// const isOne = x === 1;
// while (i < 3) {
//     $(i);
//     if (isOne) {
//         $(1);
//         result = 1;
//     }
//     i = i + 1;
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
$(0);
let result /*:number*/ = 0;
$(1);
const tmpIfTest$1 /*:boolean*/ = x === 1;
if (tmpIfTest$1) {
  result = 1;
  $(1);
} else {
}
const tmpIfTest$4 /*:boolean*/ = x === 1;
if (tmpIfTest$4) {
  $(1);
  result = 1;
  $(2);
} else {
  $(2);
}
const tmpIfTest$5 /*:boolean*/ = x === 1;
if (tmpIfTest$5) {
  $(1);
  $(1);
} else {
  $(result);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
$(0);
let result = 0;
$(1);
if (x === 1) {
  result = 1;
  $(1);
}
if (x === 1) {
  $(1);
  result = 1;
  $(2);
} else {
  $(2);
}
if (x === 1) {
  $(1);
  $(1);
} else {
  $(result);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( 0 );
let b = 0;
$( 1 );
const c = a === 1;
if (c) {
  b = 1;
  $( 1 );
}
const d = a === 1;
if (d) {
  $( 1 );
  b = 1;
  $( 2 );
}
else {
  $( 2 );
}
const e = a === 1;
if (e) {
  $( 1 );
  $( 1 );
}
else {
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1);
let i = 0;
let result = 0;
while (true) {
  const tmpIfTest = i < 3;
  if (tmpIfTest) {
    $(i);
    const tmpIfTest$1 = x === 1;
    if (tmpIfTest$1) {
      $(1);
      result = 1;
    } else {
    }
    i = i + 1;
  } else {
    break;
  }
}
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
