# Preval test case

# arr_obj.md

> Normalize > Pattern > Assignment > Base inner def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
var x, a = 100;
([{ x = a }] = [{}]);
$(x, a);
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $Object_prototype.x;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  $(100, 100);
} else {
  $(tmpOPBD, 100);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $Object_prototype.x;
if (tmpOPBD === undefined) {
  $(100, 100);
} else {
  $(tmpOPBD, 100);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
const b = a === undefined;
if (b) {
  $( 100, 100 );
}
else {
  $( a, 100 );
}
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100, 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
