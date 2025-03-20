# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = /foo/)]);
$(a);
`````


## Settled


`````js filename=intro
const a /*:regex*/ = /foo/;
const tmpCalleeParam /*:array*/ = [...a];
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = /foo/;
$([...a]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = /foo/;
const b = [ ...a ];
$( b );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
