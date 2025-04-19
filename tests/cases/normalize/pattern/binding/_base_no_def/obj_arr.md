# Preval test case

# obj_arr.md

> Normalize > Pattern > Binding > Base no def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: [ y ]} = 1
`````


## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = $Number_prototype.x;
[...objPatternNoDefault];
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = $Number_prototype.x;
[...objPatternNoDefault];
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
[ ...a ];
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
