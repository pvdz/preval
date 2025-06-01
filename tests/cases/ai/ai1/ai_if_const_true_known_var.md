# Preval test case

# ai_if_const_true_known_var.md

> Ai > Ai1 > Ai if const true known var
>
> Test: if statement with a condition from a const variable KNOWN to be true (not from $()).

## Input

`````js filename=intro
// Expected: let y; y = $('then'); $('after_if', y);
let flag = true; // Preval should know this is true
let y;
if (flag) {
  y = $('then');
} else {
  y = $('else_SHOULD_BE_REMOVED');
}
$('after_if', y);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_y /*:unknown*/ = $(`then`);
$(`after_if`, tmpClusterSSA_y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`after_if`, $(`then`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "then" );
$( "after_if", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let flag = true;
let y = undefined;
if (flag) {
  y = $(`then`);
  $(`after_if`, y);
} else {
  y = $(`else_SHOULD_BE_REMOVED`);
  $(`after_if`, y);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'then'
 - 2: 'after_if', 'then'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
