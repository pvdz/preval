# Preval test case

# string_concat_two.md

> Type tracked > String method > String concat two
>
> String concat should fully resolve

## Input

`````js filename=intro
$('hello'.concat(', ', 'world'));
`````

## Settled


`````js filename=intro
$(`hello, world`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`hello, world`);
`````

## Pre Normal


`````js filename=intro
$(`hello`.concat(`, `, `world`));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `hello`.concat(`, `, `world`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "hello, world" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'hello, world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
