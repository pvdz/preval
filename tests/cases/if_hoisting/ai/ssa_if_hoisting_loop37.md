# Preval test case

# ssa_if_hoisting_loop37.md

> If hoisting > Ai > Ssa if hoisting loop37
>
> Test if_hoisting and SSA infinite loop: identical vars used in array access

## Input

`````js filename=intro
const arr = $("arr");
if (arr) {
  let var1 = 0;
  $(var1);
  let item1 = arr[var1];
  $(item1);
} else {
  let var2 = 0;
  $(var2);
  let item2 = arr[var2];
  $(item2);
}
`````


## Settled


`````js filename=intro
const arr /*:unknown*/ = $(`arr`);
$(0);
const item1 /*:unknown*/ = arr[0];
$(item1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $(`arr`);
$(0);
$(arr[0]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "arr" );
$( 0 );
const b = a[ 0 ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = $(`arr`);
if (arr) {
  let var1 = 0;
  $(var1);
  let item1 = arr[var1];
  $(item1);
} else {
  let var2 = 0;
  $(var2);
  let item2 = arr[var2];
  $(item2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'arr'
 - 2: 0
 - 3: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
