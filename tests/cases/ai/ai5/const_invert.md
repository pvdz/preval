# Preval test case

# const_invert.md

> Ai > Ai5 > Const invert
>
> Test const comparison inversion

## Input

`````js filename=intro
const x = $(1);
let result = 0;

if (!(x === 1)) {
    $(1);  // Track inverted condition
    result = 1;
} else {
    $(2);  // Track else branch
}

$(result);

// Expected:
// const x = $(1);
// let result = 0;
// if (x !== 1) {
//     $(1);
//     result = 1;
// } else {
//     $(2);
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = x === 1;
if (tmpIfTest) {
  $(2);
  $(0);
} else {
  $(1);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === 1) {
  $(2);
  $(0);
} else {
  $(1);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a === 1;
if (b) {
  $( 2 );
  $( 0 );
}
else {
  $( 1 );
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1);
let result = 0;
const tmpIfTest = x === 1;
if (tmpIfTest) {
  $(2);
  $(result);
} else {
  $(1);
  result = 1;
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
 - 3: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
