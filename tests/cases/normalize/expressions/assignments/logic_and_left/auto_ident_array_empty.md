# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = []) && $(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
const a /*:array*/ /*truthy*/ = [];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$([]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = [];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
