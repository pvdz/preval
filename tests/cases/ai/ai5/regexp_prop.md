# Preval test case

# regexp_prop.md

> Ai > Ai5 > Regexp prop
>
> Test normalization of RegExp property access

## Input

`````js filename=intro
const obj = { "/a/": 1 };
const x = obj[/a/];
$(x);

// Expected:
// const obj = { "/a/": 1 };
// const x = obj["/a/"];
// $(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:regex*/ /*truthy*/ = new $regex_constructor(`a`, ``);
const tmpCompObj /*:object*/ /*truthy*/ = { [`/a/`]: 1 };
const x /*:unknown*/ = tmpCompObj[tmpCalleeParam];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = new $regex_constructor(`a`, ``);
$({ [`/a/`]: 1 }[tmpCalleeParam]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "a", "" );
const b = { [ "/a/" ]: 1 };
const c = b[ a ];
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { [`/a/`]: 1 };
const tmpCompObj = obj;
const tmpCalleeParam = new $regex_constructor(`a`, ``);
const x = tmpCompObj[tmpCalleeParam];
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
