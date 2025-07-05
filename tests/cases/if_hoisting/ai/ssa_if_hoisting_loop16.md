# Preval test case

# ssa_if_hoisting_loop16.md

> If hoisting > Ai > Ssa if hoisting loop16
>
> Test if_hoisting and SSA infinite loop: identical var declarations with call expressions

## Input

`````js filename=intro
const input = $("input");
if (input) {
  let call1 = parseInt("123");
  $(call1);
} else {
  let call2 = parseInt("123");
  $(call2);
}
`````


## Settled


`````js filename=intro
$(`input`);
$(123);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`input`);
$(123);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "input" );
$( 123 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const input = $(`input`);
if (input) {
  let call1 = 123;
  $(call1);
} else {
  let call2 = 123;
  $(call2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'input'
 - 2: 123
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
