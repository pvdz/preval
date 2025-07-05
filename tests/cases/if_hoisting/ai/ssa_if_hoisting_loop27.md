# Preval test case

# ssa_if_hoisting_loop27.md

> If hoisting > Ai > Ssa if hoisting loop27
>
> Test if_hoisting and SSA infinite loop: identical var declarations with spread elements

## Input

`````js filename=intro
const arr = $("arr");
if (arr) {
  let spread1 = [...arr];
  $(spread1);
} else {
  let spread2 = [...arr];
  $(spread2);
}
`````


## Settled


`````js filename=intro
const arr /*:unknown*/ = $(`arr`);
const spread1 /*:array*/ /*truthy*/ = [...arr];
$(spread1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $(`arr`);
$([...arr]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "arr" );
const b = [ ...a ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = $(`arr`);
if (arr) {
  let spread1 = [...arr];
  $(spread1);
} else {
  let spread2 = [...arr];
  $(spread2);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'arr'
 - 2: ['a', 'r', 'r']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
