# Preval test case

# obj_str.md

> If test merging > Obj str
>
> When if test is an unknown boolean and the first statement is equal 
> except for boolean values then it can replace them with the test var.

## Input

`````js filename=intro
const bool = Boolean($(true));
let x;
if (bool) {
  x = {"a b": 1, b: true};
} else {
  x = {"a b": 1, b: false};
}
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(true);
const tmpBool /*:boolean*/ = Boolean(tmpCalleeParam);
const tmpClusterSSA_x /*:object*/ = { [`a b`]: 1, b: tmpBool };
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBool = Boolean($(true));
$({ [`a b`]: 1, b: tmpBool });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = Boolean( a );
const c = {
  [ "a b" ]: 1,
  b: b,
};
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: { 'a b': '1', b: 'true' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
