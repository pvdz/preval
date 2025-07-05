# Preval test case

# ssa_if_hoisting_loop5.md

> If hoisting > Ai > Ssa if hoisting loop5
>
> Test if_hoisting and SSA infinite loop: identical var declarations with object literals

## Input

`````js filename=intro
const check = $("check");
if (check) {
  let obj1 = { x: 1, y: 2 };
  $(obj1);
} else {
  let obj2 = { x: 1, y: 2 };
  $(obj2);
}
`````


## Settled


`````js filename=intro
$(`check`);
const obj1 /*:object*/ /*truthy*/ = { x: 1, y: 2 };
$(obj1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`check`);
$({ x: 1, y: 2 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( "check" );
const a = {
  x: 1,
  y: 2,
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const check = $(`check`);
if (check) {
  let obj1 = { x: 1, y: 2 };
  $(obj1);
} else {
  let obj2 = { x: 1, y: 2 };
  $(obj2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'check'
 - 2: { x: '1', y: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
