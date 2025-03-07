# Preval test case

# string_concat_zero.md

> Type tracked > String method > String concat zero
>
> String concat should fully resolve

## Input

`````js filename=intro
$('hello'.concat());
`````

## Settled


`````js filename=intro
$(`hello`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`hello`);
`````

## Pre Normal


`````js filename=intro
$(`hello`.concat());
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `hello`.concat();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "hello" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
