# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident cond s-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)))]);
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_a /*:unknown*/ = $(60);
const tmpCalleeParam /*:array*/ /*truthy*/ = [...tmpClusterSSA_a];
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $(60);
$([...tmpClusterSSA_a]);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
const b = [ ...a ];
$( b );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(60);
} else {
  let tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
}
const tmpArrSpread = a;
let tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 60
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
