# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident cond s-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)))]: 10 });
$(a);
`````


## Settled


`````js filename=intro
const tmpSSA_a /*:unknown*/ = $(60);
const tmpCalleeParam /*:object*/ = { [tmpSSA_a]: 10 };
$(tmpCalleeParam);
$(tmpSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_a = $(60);
$({ [tmpSSA_a]: 10 });
$(tmpSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
const b = { [ a ]: 10 };
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
const tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
let tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 60
 - 2: { 60: '10' }
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
