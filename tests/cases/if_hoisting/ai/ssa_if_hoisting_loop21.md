# Preval test case

# ssa_if_hoisting_loop21.md

> If hoisting > Ai > Ssa if hoisting loop21
>
> Test if_hoisting and SSA infinite loop: identical var declarations with assignment expressions

## Input

`````js filename=intro
const base = $("base");
if (base) {
  let assign1 = base = 100;
  $(assign1);
} else {
  let assign2 = base = 100;
  $(assign2);
}
`````


## Settled


`````js filename=intro
$(`base`);
throw `Preval: Cannot write to const binding \`base\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`base`);
throw `Preval: Cannot write to const binding \`base\``;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "base" );
throw "Preval: Cannot write to const binding `base`";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const base = $(`base`);
if (base) {
  base = 100;
  let assign1 = base;
  $(base);
} else {
  base = 100;
  let assign2 = base;
  $(base);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'base'
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
