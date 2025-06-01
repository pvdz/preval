# Preval test case

# conditional_constant_propagation.md

> Ai > Ai5 > Conditional constant propagation
>
> Test propagation of constants from conditional branches

## Input

`````js filename=intro
const test = $(true);
if (test) {
    const value = $("same");
    $(value);
} else {
    const value = $("same");
    $(value);
}
// Expected output:
// const test = $(true);
// const value = $("same");
// if (test) {
//     $(value);
// } else {
//     $(value);
// }
`````


## Settled


`````js filename=intro
$(true);
const value /*:unknown*/ = $(`same`);
$(value);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$($(`same`));
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
const a = $( "same" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const test = $(true);
if (test) {
  const value = $(`same`);
  $(value);
} else {
  const value$1 = $(`same`);
  $(value$1);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'same'
 - 3: 'same'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
