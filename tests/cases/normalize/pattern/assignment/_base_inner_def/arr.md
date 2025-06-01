# Preval test case

# arr.md

> Normalize > Pattern > Assignment > Base inner def > Arr
>
> Testing simple pattern normalizations

## Options

- globals: x

## Input

`````js filename=intro
([ x = a ] = [1]);
`````


## Settled


`````js filename=intro
x = 1;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = 1;
`````


## PST Settled
With rename=true

`````js filename=intro
x = 1;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrAssignPatternRhs = [1];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
const tmpAPBD = tmpArrPatternSplat[0];
const tmpIfTest = tmpAPBD === undefined;
if (tmpIfTest) {
  x = a;
} else {
  x = tmpAPBD;
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ Cannot set property x of #<Object> which has only a getter ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
