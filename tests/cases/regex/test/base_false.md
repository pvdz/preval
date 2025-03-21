# Preval test case

# base_false.md

> Regex > Test > Base false
>
> We can resolve regex.test if we know the regex and the arg

## Input

`````js filename=intro
$(/foo/.test("brafonody"));
`````

## Settled


`````js filename=intro
$(false);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
`````

## Pre Normal


`````js filename=intro
$(/foo/.test(`brafonody`));
`````

## Normalized


`````js filename=intro
const tmpCallObj = /foo/;
const tmpCalleeParam = tmpCallObj.test(`brafonody`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( false );
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
