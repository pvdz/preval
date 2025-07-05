# Preval test case

# ssa_if_hoisting_loop39.md

> If hoisting > Ai > Ssa if hoisting loop39
>
> Test if_hoisting and SSA infinite loop: identical vars used in logical expressions

## Input

`````js filename=intro
const logic = $("logic");
if (logic) {
  let var1 = true;
  $(var1);
  let result1 = var1 && logic;
  $(result1);
} else {
  let var2 = true;
  $(var2);
  let result2 = var2 && logic;
  $(result2);
}
`````


## Settled


`````js filename=intro
const logic /*:unknown*/ = $(`logic`);
$(true);
$(logic);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const logic = $(`logic`);
$(true);
$(logic);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "logic" );
$( true );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const logic = $(`logic`);
if (logic) {
  let var1 = true;
  $(var1);
  let result1 = var1;
  if (result1) {
    result1 = logic;
    $(logic);
  } else {
    $(result1);
  }
} else {
  let var2 = true;
  $(var2);
  let result2 = var2;
  if (result2) {
    result2 = logic;
    $(logic);
  } else {
    $(result2);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'logic'
 - 2: true
 - 3: 'logic'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
