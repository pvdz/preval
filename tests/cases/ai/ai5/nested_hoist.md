# Preval test case

# nested_hoist.md

> Ai > Ai5 > Nested hoist
>
> Test nested condition hoisting

## Input

`````js filename=intro
const x = $(6);
let result = 0;

if (x > 5) {
    $(1);  // Track first condition
    if (x > 4) {  // This is always true
        $(2);  // Track second condition
        if (x > 3) {  // This is always true
            $(3);  // Track third condition
            result = 1;
        }
    }
} else {
    $(4);  // Track else branch
}

$(result);

// Expected:
// const x = $(6);
// let result = 0;
// if (x > 5) {
//     $(1);
//     result = 1;  // Nested conditions should be eliminated
// } else {
//     $(4);
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(6);
const tmpIfTest /*:boolean*/ = x > 5;
if (tmpIfTest) {
  $(1);
  $(2);
  $(3);
  $(1);
} else {
  $(4);
  $(0);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(6) > 5) {
  $(1);
  $(2);
  $(3);
  $(1);
} else {
  $(4);
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
  $( 2 );
  $( 3 );
  $( 1 );
}
else {
  $( 4 );
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
    const tmpIfTest$3 = x > 3;
    if (tmpIfTest$3) {
      $(3);
      result = 1;
      $(result);
    } else {
      $(result);
    }
  } else {
    $(result);
  }
} else {
  $(4);
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
 - 4: 3
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
