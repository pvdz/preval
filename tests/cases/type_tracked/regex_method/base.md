# Preval test case

# base.md

> Type tracked > Regex method > Base
>
> Regex method call inlining

## Input

`````js filename=intro
$(/foo/.test('hello foo world'));
`````

## Settled


`````js filename=intro
$(true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````

## Pre Normal


`````js filename=intro
$(/foo/.test(`hello foo world`));
`````

## Normalized


`````js filename=intro
const tmpCallObj = /foo/;
const tmpCalleeParam = tmpCallObj.test(`hello foo world`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
