# Preval test case

# mutual_exclusive.md

> Ai > Ai5 > Mutual exclusive
>
> Test mutually exclusive condition elimination

## Input

`````js filename=intro
const x = $(1);
let result = 0;

if (x === 1) {
    $(1);  // Track first branch
    if (x === 2) {  // This can never be true
        $(2);  // Track impossible branch
        result = 1;
    }
} else {
    $(3);  // Track else branch
}

$(result);

// Expected:
// const x = $(1);
// let result = 0;
// if (x === 1) {
//     $(1);
//     // x === 2 check should be eliminated
// } else {
//     $(3);
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = x === 1;
if (tmpIfTest) {
  $(1);
  $(0);
} else {
  $(3);
  $(0);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === 1) {
  $(1);
  $(0);
} else {
  $(3);
  $(0);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a === 1;
if (b) {
  $( 1 );
  $( 0 );
}
else {
  $( 3 );
  $( 0 );
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
  const tmpIfTest$1 = x === 2;
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
 - 1: 1
 - 2: 1
 - 3: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
