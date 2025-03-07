# Preval test case

# get_regex_constructor.md

> Regex > Constructor > Get regex constructor
>
> Edge case implemented to solve jsf*ck

## Input

`````js filename=intro
const x = /foo/
const c = x.constructor;
const y = c('x', 'g');
$(y); // the regex `/x/g`
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
const x = /foo/;
const c = x.constructor;
const y = c(`x`, `g`);
$(y);
`````

## Normalized


`````js filename=intro
const x = /foo/;
const c = x.constructor;
const y = c(`x`, `g`);
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
