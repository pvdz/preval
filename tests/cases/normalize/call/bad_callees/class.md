# Preval test case

# class.md

> Normalize > Call > Bad callees > Class
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
(class x{}());
$('after');
`````

## Settled


`````js filename=intro
$(`before`);
const tmpCallComplexCallee /*:class*/ = class x {};
tmpCallComplexCallee();
$(`after`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
const tmpCallComplexCallee = class x {};
tmpCallComplexCallee();
$(`after`);
`````

## Pre Normal


`````js filename=intro
$(`before`);
(class x {}());
$(`after`);
`````

## Normalized


`````js filename=intro
$(`before`);
const tmpCallComplexCallee = class x {};
tmpCallComplexCallee();
$(`after`);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "before" );
const a = class x  {

};
a();
$( "after" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - 1: 'before'
 - eval returned: ("<crash[ Class constructor x cannot be invoked without 'new' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
