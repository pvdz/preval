# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = /foo/)]: 10 });
$(a);
`````


## Settled


`````js filename=intro
const a /*:regex*/ = /foo/;
const tmpCalleeParam /*:object*/ = { [a]: 10 };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = /foo/;
$({ [a]: 10 });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = /foo/;
const b = { [ a ]: 10 };
$( b );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { '/foo/': '10' }
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
