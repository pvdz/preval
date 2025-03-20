# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = /foo/)];
$(a);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = {};
const a /*:regex*/ = /foo/;
obj[a];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = {};
const a = /foo/;
obj[a];
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = /foo/;
a[ b ];
$( b );
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
