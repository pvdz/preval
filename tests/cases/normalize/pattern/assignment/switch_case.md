# Preval test case

# switch_case.md

> Normalize > Pattern > Assignment > Switch case
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

## Input

`````js filename=intro
switch (0) {
  case 0:
    let a = 10;
    let b = 20;
    [a, b] = [30, 40];
    $(a, b);
}
`````


## Settled


`````js filename=intro
$(30, 40);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(30, 40);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 30, 40 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
const tmpSwitchDisc = 0;
const tmpIfTest = tmpSwitchDisc === 0;
if (tmpIfTest) {
  a = 10;
  b = 20;
  const tmpArrAssignPatternRhs = [30, 40];
  const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
  a = tmpArrPatternSplat[0];
  b = tmpArrPatternSplat[1];
  $(a, b);
} else {
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30, 40
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
