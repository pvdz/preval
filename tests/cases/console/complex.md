# Preval test case

# complex.md

> Console > Complex
>
>

## Input

`````js filename=intro
console.log(['console tet case']);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`console tet case`];
console.log(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
console.log([`console tet case`]);
`````

## Pre Normal


`````js filename=intro
console.log([`console tet case`]);
`````

## Normalized


`````js filename=intro
const tmpCallObj = console;
const tmpCallVal = tmpCallObj.log;
const tmpCalleeParam = [`console tet case`];
$dotCall(tmpCallVal, tmpCallObj, `log`, tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "console tet case" ];
console.log( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
