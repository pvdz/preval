# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = "foo") ? $(100) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
a = `foo`;
const tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a);
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
 - 3: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
