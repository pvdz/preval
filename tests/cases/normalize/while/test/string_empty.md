# Preval test case

# string_empty.md

> Normalize > While > Test > String empty
>
> Certain test values can be statically determined to be true or false

## Input

`````js filename=intro
while ('') {
  $('loop');
}
$('after');
`````

## Settled


`````js filename=intro
$(`after`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`after`);
`````

## Pre Normal


`````js filename=intro
while (``) {
  $(`loop`);
}
$(`after`);
`````

## Normalized


`````js filename=intro
$(`after`);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "after" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
