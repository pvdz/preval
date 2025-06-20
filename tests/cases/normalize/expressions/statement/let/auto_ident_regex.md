# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Statement > Let > Auto ident regex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = /foo/;
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const xyz /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, ``);
$(xyz);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $regex_constructor(`foo`, ``));
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "foo", "" );
$( a );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = new $regex_constructor(`foo`, ``);
$(xyz);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
