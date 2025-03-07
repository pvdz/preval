# Preval test case

# base_true.md

> Regex > Test > Base true
>
> We can resolve regex.test if we know the regex and the arg

## Input

`````js filename=intro
$(/foo/.test("brafoody"));
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
$(/foo/.test(`brafoody`));
`````

## Normalized


`````js filename=intro
const tmpCallObj = /foo/;
const tmpCalleeParam = tmpCallObj.test(`brafoody`);
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
