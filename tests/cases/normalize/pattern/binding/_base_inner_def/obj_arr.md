# Preval test case

# obj_arr.md

> Normalize > Pattern > Binding > Base inner def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: [ y = a ]} = 1;
`````


## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault];
const arrPatternBeforeDefault /*:unknown*/ = arrPatternSplat[0];
const tmpIfTest /*:boolean*/ = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  a;
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = (1).x;
if ([...objPatternNoDefault][0] === undefined) {
  a;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const b = 1.x;
const c = [ ...b ];
const d = c[ 0 ];
const e = d === undefined;
if (e) {
  a;
}
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) inline computed array property read


## Globals


BAD@! Found 1 implicit global bindings:

a


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
