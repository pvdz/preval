# Preval test case

# ssa_if_hoisting_loop23.md

> If hoisting > Ai > Ssa if hoisting loop23
>
> Test if_hoisting and SSA infinite loop: identical var declarations with sequence expressions

## Input

`````js filename=intro
const a = $("a");
const b = $("b");
if (a) {
  let seq1 = (a, b);
  $(seq1);
} else {
  let seq2 = (a, b);
  $(seq2);
}
`````


## Settled


`````js filename=intro
$(`a`);
const b /*:unknown*/ = $(`b`);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
$($(`b`));
`````


## PST Settled
With rename=true

`````js filename=intro
$( "a" );
const a = $( "b" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(`a`);
const b = $(`b`);
if (a) {
  let seq1 = b;
  $(b);
} else {
  let seq2 = b;
  $(b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
