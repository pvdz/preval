# Preval test case

# const_state.md

> Ai > Ai5 > Const state
>
> Test const state tracking

## Input

`````js filename=intro
const x = $(1);
let state = 0;
let result = 0;

if (state === 0) {
    $(1);  // Track initial state
    state = 1;
    if (state === 0) {  // Impossible state
        $(2);  // Track impossible branch
        result = 1;
    }
} else {
    $(3);  // Track else branch
}

$(result);

// Expected:
// const x = $(1);
// let state = 0;
// let result = 0;
// if (state === 0) {
//     $(1);
//     state = 1;
// } else {
//     $(3);
// }
// $(result);
`````


## Settled


`````js filename=intro
$(1);
$(1);
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1);
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1 );
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1);
let state = 0;
let result = 0;
const tmpIfTest = state === 0;
if (tmpIfTest) {
  $(1);
  state = 1;
  const tmpIfTest$1 = state === 0;
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
