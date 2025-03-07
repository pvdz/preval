# Preval test case

# string_split_regex.md

> Type tracked > String method > String split regex
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.split(/o/g));
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
$(`hello world`.split(/o/g));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = /o/g;
const tmpCalleeParam = `hello world`.split(tmpCalleeParam$1);
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
