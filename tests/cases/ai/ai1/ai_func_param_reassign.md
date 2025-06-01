# Preval test case

# ai_func_param_reassign.md

> Ai > Ai1 > Ai func param reassign
>
> Test: Reassignment of a function parameter inside the function.

## Input

`````js filename=intro
// Expected: (Value of p_orig correctly tracked after reassignment)
function foo(p_orig) {
  $('p_initial', p_orig);
  p_orig = $('p_reassigned');
  $('p_after_reassign', p_orig);
}
foo($('ARG'));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`ARG`);
$(`p_initial`, tmpCalleeParam);
const tmpClusterSSA_p_orig /*:unknown*/ = $(`p_reassigned`);
$(`p_after_reassign`, tmpClusterSSA_p_orig);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`p_initial`, $(`ARG`));
$(`p_after_reassign`, $(`p_reassigned`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "ARG" );
$( "p_initial", a );
const b = $( "p_reassigned" );
$( "p_after_reassign", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let foo = function ($$0) {
  let p_orig = $$0;
  debugger;
  $(`p_initial`, p_orig);
  p_orig = $(`p_reassigned`);
  $(`p_after_reassign`, p_orig);
  return undefined;
};
const tmpCallCallee = foo;
let tmpCalleeParam = $(`ARG`);
foo(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ARG'
 - 2: 'p_initial', 'ARG'
 - 3: 'p_reassigned'
 - 4: 'p_after_reassign', 'p_reassigned'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
