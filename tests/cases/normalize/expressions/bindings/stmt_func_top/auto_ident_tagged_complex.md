# Preval test case

# auto_ident_tagged_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident tagged complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let a = $`foo${$(1)}`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam /*:array*/ = [`foo`, ``];
const a /*:unknown*/ = $(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(1);
$($([`foo`, ``], tmpCalleeParam$1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = [ "foo", "" ];
const c = $( b, a );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [`foo`, ``];
let tmpCalleeParam$1 = $(1);
let a = $(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: ['foo', ''], 1
 - 3: ['foo', '']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
