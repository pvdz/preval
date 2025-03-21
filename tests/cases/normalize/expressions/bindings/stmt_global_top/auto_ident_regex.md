# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident regex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let a = /foo/;
$(a);
`````

## Settled


`````js filename=intro
const a /*:regex*/ = /foo/;
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(/foo/);
`````

## Pre Normal


`````js filename=intro
let a = /foo/;
$(a);
`````

## Normalized


`````js filename=intro
let a = /foo/;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = /foo/;
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
