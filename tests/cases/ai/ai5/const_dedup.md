# Preval test case

# const_dedup.md

> Ai > Ai5 > Const dedup
>
> Test const comparison deduplication

## Input

`````js filename=intro
const x = $(1);
let result = 0;

if (x === 1) {
    $(1);  // Track first check
    result = 1;
}
if (x === 1) {  // Duplicate check
    $(2);  // Track second check
    result = 2;
}

$(result);

// Expected:
// const x = $(1);
// let result = 0;
// const isOne = x === 1;
// if (isOne) {
//     $(1);
//     result = 1;
// }
// if (isOne) {
//     $(2);
//     result = 2;
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
let result /*:number*/ /*ternaryConst*/ = 0;
const tmpIfTest /*:boolean*/ = x === 1;
if (tmpIfTest) {
  $(1);
  result = 1;
} else {
}
const tmpIfTest$1 /*:boolean*/ = x === 1;
if (tmpIfTest$1) {
  $(2);
  $(2);
} else {
  $(result);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
let result = 0;
if (x === 1) {
  $(1);
  result = 1;
}
if (x === 1) {
  $(2);
  $(2);
} else {
  $(result);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 0;
const c = a === 1;
if (c) {
  $( 1 );
  b = 1;
}
const d = a === 1;
if (d) {
  $( 2 );
  $( 2 );
}
else {
  $( b );
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
} else {
}
const tmpIfTest$1 = x === 1;
if (tmpIfTest$1) {
  $(2);
  result = 2;
  $(result);
} else {
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
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
