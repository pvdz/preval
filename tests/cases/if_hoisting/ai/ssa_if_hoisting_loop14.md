# Preval test case

# ssa_if_hoisting_loop14.md

> If hoisting > Ai > Ssa if hoisting loop14
>
> Test if_hoisting and SSA infinite loop: identical var declarations with regex literals

## Input

`````js filename=intro
const pattern = $("pattern");
if (pattern) {
  let regex1 = /test/;
  $(regex1);
} else {
  let regex2 = /test/;
  $(regex2);
}
`````


## Settled


`````js filename=intro
$(`pattern`);
const regex1 /*:regex*/ /*truthy*/ = new $regex_constructor(`test`, ``);
$(regex1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pattern`);
$(new $regex_constructor(`test`, ``));
`````


## PST Settled
With rename=true

`````js filename=intro
$( "pattern" );
const a = new $regex_constructor( "test", "" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const pattern = $(`pattern`);
if (pattern) {
  let regex1 = new $regex_constructor(`test`, ``);
  $(regex1);
} else {
  let regex2 = new $regex_constructor(`test`, ``);
  $(regex2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pattern'
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
