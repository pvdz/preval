# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = /foo/) ? $(100) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const a /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, ``);
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = new $regex_constructor(`foo`, ``);
$($(100));
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "foo", "" );
const b = $( 100 );
$( b );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
a = new $regex_constructor(`foo`, ``);
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
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
