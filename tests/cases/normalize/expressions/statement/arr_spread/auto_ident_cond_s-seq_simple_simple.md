# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident cond s-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...((10, 20, 30) ? $(2) : $($(100)))];
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpArrElToSpread /*:unknown*/ = $(2);
[...tmpClusterSSA_tmpArrElToSpread];
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpArrElToSpread = $(2);
[...tmpClusterSSA_tmpArrElToSpread];
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
[ ...a ];
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpArrElToSpread = $(2);
} else {
  let tmpCalleeParam = $(100);
  tmpArrElToSpread = $(tmpCalleeParam);
}
[...tmpArrElToSpread];
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
