# Preval test case

# regexp_constructor_two_strings.md

> Regex > Constructor > Regexp constructor two strings
>
> Edge case implemented to solve jsf*ck

## Input

`````js filename=intro
const y = RegExp(`x`, `g`);
$(y);
`````

## Settled


`````js filename=intro
const y /*:regex*/ = /x/g;
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(/x/g);
`````

## Pre Normal


`````js filename=intro
const y = RegExp(`x`, `g`);
$(y);
`````

## Normalized


`````js filename=intro
const y = /x/g;
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = /x/g;
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
