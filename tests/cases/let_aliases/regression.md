# Preval test case

# regression.md

> Let aliases > Regression
>
> The bug was that it would eliminate A and then just rename C to B leading to double const binding names
> The fix was to consider the later constant the dupe rather than the first.

## Input

`````js filename=intro
let a = $();
const A = a;
const B = a;
const C = a;
a = $(`u`);
const aa = [A, B, C];
`````

## Pre Normal


`````js filename=intro
let a = $();
const A = a;
const B = a;
const C = a;
a = $(`u`);
const aa = [A, B, C];
`````

## Normalized


`````js filename=intro
let a = $();
const A = a;
const B = a;
const C = a;
a = $(`u`);
const aa = [A, B, C];
`````

## Output


`````js filename=intro
$();
$(`u`);
`````

## PST Output

With rename=true

`````js filename=intro
$();
$( "u" );
`````

## Denormalized

(This ought to be the final result)


`````js filename=intro
$();
$(`u`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 'u'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
