# Preval test case

# string_split_multi.md

> Type tracked > String method > String split multi
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.split('', $, unknown));
`````

## Settled


`````js filename=intro
unknown;
const tmpCalleeParam /*:array*/ = [`h`, `e`, `l`, `l`, `o`, ` `, `w`, `o`, `r`, `l`, `d`];
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
unknown;
$([`h`, `e`, `l`, `l`, `o`, ` `, `w`, `o`, `r`, `l`, `d`]);
`````

## Pre Normal


`````js filename=intro
$(`hello world`.split(``, $, unknown));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `hello world`.split(``, $, unknown);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
unknown;
const a = [ "h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d" ];
$( a );
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
