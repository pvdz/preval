# Preval test case

# ssa_if_hoisting_loop28.md

> If hoisting > Ai > Ssa if hoisting loop28
>
> Test if_hoisting and SSA infinite loop: identical var declarations with computed member expressions

## Input

`````js filename=intro
const obj = $("obj");
const prop = $("prop");
if (obj) {
  let computed1 = obj[prop];
  $(computed1);
} else {
  let computed2 = obj[prop];
  $(computed2);
}
`````


## Settled


`````js filename=intro
const obj /*:unknown*/ = $(`obj`);
const prop /*:unknown*/ = $(`prop`);
const computed1 /*:unknown*/ = obj[prop];
$(computed1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $(`obj`);
const prop = $(`prop`);
$(obj[prop]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "obj" );
const b = $( "prop" );
const c = a[ b ];
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = $(`obj`);
const prop = $(`prop`);
if (obj) {
  let computed1 = obj[prop];
  $(computed1);
} else {
  let computed2 = obj[prop];
  $(computed2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'obj'
 - 2: 'prop'
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
