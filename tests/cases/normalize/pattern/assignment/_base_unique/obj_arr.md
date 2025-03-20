# Preval test case

# obj_arr.md

> Normalize > Pattern > Assignment > Base unique > Obj arr
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let y = 1; }
({x: [ y ]} = 1);
{ let y = 1; }
`````


## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault];
y = arrPatternSplat[0];
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = (1).x;
y = [...objPatternNoDefault][0];
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 1.x;
const b = [ ...a ];
y = b[ 0 ];
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
