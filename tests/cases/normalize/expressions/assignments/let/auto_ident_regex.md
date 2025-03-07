# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Let > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = /foo/);
$(xyz);
$(a);
`````

## Settled


`````js filename=intro
const a /*:regex*/ = /foo/;
$(a);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = /foo/;
$(a);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = /foo/);
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = /foo/;
let xyz = a;
$(xyz);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = /foo/;
$( a );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
