# Preval test case

# empty_string_replace.md

> Builtins cases > Empty string replace
>
>

## Input

`````js filename=intro
$(''.replace(/^/, String));
`````

## Settled


`````js filename=intro
$(``);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(``);
`````

## Pre Normal


`````js filename=intro
$(``.replace(/^/, String));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = /^/;
const tmpCalleeParam$3 = String;
const tmpCalleeParam = ``.replace(tmpCalleeParam$1, tmpCalleeParam$3);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
