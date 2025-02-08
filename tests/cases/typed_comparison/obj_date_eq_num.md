# Preval test case

# obj_date_eq_num.md

> Typed comparison > Obj date eq num
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = new Date();
const y = x === false;
$('out:', y);
`````

## Pre Normal


`````js filename=intro
const x = new Date();
const y = x === false;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const x = new Date();
const y = x === false;
$(`out:`, y);
`````

## Output


`````js filename=intro
new Date();
$(`out:`, false);
`````

## PST Output

With rename=true

`````js filename=intro
new Date();
$( "out:", false );
`````

## Denormalized

(This ought to be the final result)


`````js filename=intro
new Date();
$(`out:`, false);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
