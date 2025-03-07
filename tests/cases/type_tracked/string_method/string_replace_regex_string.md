# Preval test case

# string_replace_regex_string.md

> Type tracked > String method > String replace regex string
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello   world'.replace(/ /g, '.'));
`````

## Settled


`````js filename=intro
$(`hello...world`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`hello...world`);
`````

## Pre Normal


`````js filename=intro
$(`hello   world`.replace(/ /g, `.`));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = / /g;
const tmpCalleeParam = `hello   world`.replace(tmpCalleeParam$1, `.`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "hello...world" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'hello...world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
