# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Statement > Throw > Auto ident regex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw /foo/;
$(a);
`````


## Settled


`````js filename=intro
const tmpThrowArg /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, ``);
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpThrowArg = new $regex_constructor(`foo`, ``);
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "foo", "" );
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpThrowArg = new $regex_constructor(`foo`, ``);
throw tmpThrowArg;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ /foo/ ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
