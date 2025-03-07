# Preval test case

# base_flags.md

> Normalize > Regexp > Constructor > Base flags
>
> Creating a regexp through constructor is same as doing as literal

## Input

`````js filename=intro
$(new RegExp("foo\\(x\\)", "mg"));
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:regex*/ = /foo\(x\)/gm;
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(/foo\(x\)/gm);
`````

## Pre Normal


`````js filename=intro
$(new RegExp(`foo\\(x\\)`, `mg`));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = /foo\(x\)/gm;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = /foo\(x\)/gm;
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
