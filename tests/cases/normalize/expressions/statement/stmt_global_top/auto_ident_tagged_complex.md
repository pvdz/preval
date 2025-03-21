# Preval test case

# auto_ident_tagged_complex.md

> Normalize > Expressions > Statement > Stmt global top > Auto ident tagged complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

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


## Todos triggered


None


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
