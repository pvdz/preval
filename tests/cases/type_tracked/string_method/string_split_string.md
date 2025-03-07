# Preval test case

# string_split_string.md

> Type tracked > String method > String split string
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.split('o'));
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`hell`, ` w`, `rld`];
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`hell`, ` w`, `rld`]);
`````

## Pre Normal


`````js filename=intro
$(`hello world`.split(`o`));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `hello world`.split(`o`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "hell", " w", "rld" ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['hell', ' w', 'rld']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
