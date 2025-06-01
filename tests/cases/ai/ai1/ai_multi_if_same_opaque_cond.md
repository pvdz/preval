# Preval test case

# ai_multi_if_same_opaque_cond.md

> Ai > Ai1 > Ai multi if same opaque cond
>
> Test: Multiple if statements testing the same opaque condition variable.

## Input

`````js filename=intro
// Expected: (Likely no major structural change if cond remains opaque)
let cond = $('C_VAL');
if (cond) { 
  $('A');
}
// cond is not reassigned here
if (cond) { 
  $('B');
} else {
  $('D');
}
$('E');
`````


## Settled


`````js filename=intro
const cond /*:unknown*/ = $(`C_VAL`);
if (cond) {
  $(`A`);
  $(`B`);
  $(`E`);
} else {
  $(`D`);
  $(`E`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`C_VAL`)) {
  $(`A`);
  $(`B`);
  $(`E`);
} else {
  $(`D`);
  $(`E`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "C_VAL" );
if (a) {
  $( "A" );
  $( "B" );
  $( "E" );
}
else {
  $( "D" );
  $( "E" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let cond = $(`C_VAL`);
if (cond) {
  $(`A`);
  if (cond) {
    $(`B`);
    $(`E`);
  } else {
    $(`D`);
    $(`E`);
  }
} else {
  $(`D`);
  $(`E`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'C_VAL'
 - 2: 'A'
 - 3: 'B'
 - 4: 'E'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
