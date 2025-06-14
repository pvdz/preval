# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = typeof x) && $(100));
$(a, x);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
$( "number", 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
a = typeof x;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a, x);
} else {
  $(tmpCalleeParam);
  $(a, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
