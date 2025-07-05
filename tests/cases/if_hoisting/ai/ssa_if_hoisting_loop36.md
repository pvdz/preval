# Preval test case

# ssa_if_hoisting_loop36.md

> If hoisting > Ai > Ssa if hoisting loop36
>
> Test if_hoisting and SSA infinite loop: identical vars used in object property access

## Input

`````js filename=intro
const obj = $("obj");
if (obj) {
  let var1 = "test";
  $(var1);
  let prop1 = obj[var1];
  $(prop1);
} else {
  let var2 = "test";
  $(var2);
  let prop2 = obj[var2];
  $(prop2);
}
`````


## Settled


`````js filename=intro
const obj /*:unknown*/ = $(`obj`);
$(`test`);
const prop1 /*:unknown*/ = obj.test;
$(prop1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $(`obj`);
$(`test`);
$(obj.test);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "obj" );
$( "test" );
const b = a.test;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = $(`obj`);
if (obj) {
  let var1 = `test`;
  $(var1);
  let prop1 = obj[var1];
  $(prop1);
} else {
  let var2 = `test`;
  $(var2);
  let prop2 = obj[var2];
  $(prop2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'obj'
 - 2: 'test'
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
