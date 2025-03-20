# Preval test case

# base_no_flags.md

> Normalize > Regexp > Constructor > Base no flags
>
> Creating a regexp through constructor is same as doing as literal

## Input

`````js filename=intro
$(new RegExp("foo\\(x\\)"));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:regex*/ = /foo\(x\)/;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(/foo\(x\)/);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = /foo\(x\)/;
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
