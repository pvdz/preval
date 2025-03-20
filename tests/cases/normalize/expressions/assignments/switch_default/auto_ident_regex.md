# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Switch default > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = /foo/;
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const a /*:regex*/ = /foo/;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(/foo/);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = /foo/;
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
