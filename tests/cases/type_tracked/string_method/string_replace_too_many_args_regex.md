# Preval test case

# string_replace_too_many_args_regex.md

> Type tracked > String method > String replace too many args regex
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.replace(/ /g, ', ', $, unknown));
`````

## Settled


`````js filename=intro
unknown;
$(`hello, world`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
unknown;
$(`hello, world`);
`````

## Pre Normal


`````js filename=intro
$(`hello world`.replace(/ /g, `, `, $, unknown));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = / /g;
const tmpCalleeParam$3 = $;
const tmpCalleeParam$5 = unknown;
const tmpCalleeParam = `hello world`.replace(tmpCalleeParam$1, `, `, tmpCalleeParam$3, tmpCalleeParam$5);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
unknown;
$( "hello, world" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

unknown

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
