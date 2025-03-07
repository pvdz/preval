# Preval test case

# new_regexp_on_regex.md

> Tofix > new regexp on regex
>
> This looks silly but I think it's just the same

## Input

`````js filename=intro
const x = /abc/g;
const newLineRegex = new RegExp(x); // -> same as regex literal 
$(newLineRegex);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = /abc/g;
$(new RegExp(x));
`````

## Pre Normal


`````js filename=intro
const x = /abc/g;
const newLineRegex = new RegExp(x);
$(newLineRegex);
`````

## Normalized


`````js filename=intro
const x = /abc/g;
const newLineRegex = new RegExp(x);
$(newLineRegex);
`````

## Settled


`````js filename=intro
const x /*:regex*/ = /abc/g;
const newLineRegex /*:object*/ = new RegExp(x);
$(newLineRegex);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = /abc/g;
const b = new RegExp( a );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
