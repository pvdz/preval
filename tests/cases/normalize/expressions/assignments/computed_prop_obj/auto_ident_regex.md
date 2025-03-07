# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = /foo/)["a"];
$(a);
`````

## Settled


`````js filename=intro
const a /*:regex*/ = /foo/;
a.a;
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = /foo/;
a.a;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = /foo/)[`a`];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
a = /foo/;
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = /foo/;
a.a;
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
