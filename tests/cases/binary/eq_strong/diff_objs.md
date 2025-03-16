# Preval test case

# diff_objs.md

> Binary > Eq strong > Diff objs
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$({} === {});
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:object*/ = {};
const tmpBinBothRhs /*:object*/ = {};
const tmpCalleeParam /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = {};
$(tmpBinBothLhs === {});
`````

## Pre Normal


`````js filename=intro
$({} === {});
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = {};
const tmpBinBothRhs = {};
const tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = {};
const c = a === b;
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
