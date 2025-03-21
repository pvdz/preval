# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Throw > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = /foo/);
$(a);
`````

## Settled


`````js filename=intro
const a /*:regex*/ = /foo/;
throw a;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = /foo/;
throw a;
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = /foo/);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = /foo/;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = /foo/;
throw a;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ /foo/ ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
