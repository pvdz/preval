# Preval test case

# const_complement.md

> Ai > Ai5 > Const complement
>
> Test complementary const elimination

## Input

`````js filename=intro
const x = $(1);
let result = 0;

if (x === 1) {
    $(1);  // Track first branch
    result = 1;
} else {
    $(2);  // Track else branch
    if (x === 1) {  // Impossible condition
        $(3);  // Track impossible branch
        result = 2;
    }
}

$(result);

// Expected:
// const x = $(1);
// let result = 0;
// if (x === 1) {
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
  $(1);
  $(1);
} else {
  $(2);
  $(0);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === 1) {
  $(1);
  $(1);
} else {
  $(2);
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
  $( 1 );
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
let result = 0;
const tmpIfTest = x === 1;
if (tmpIfTest) {
  $(1);
  result = 1;
  $(result);
} else {
  $(2);
  const tmpIfTest$1 = x === 1;
  if (tmpIfTest$1) {
    $(3);
    result = 2;
    $(result);
  } else {
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
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
