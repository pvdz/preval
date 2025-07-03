# Preval test case

# auto_ident_tagged_trivial.md

> Normalize > Expressions > Assignments > If > Auto ident tagged trivial
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = $`foo`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`foo`];
const a /*:unknown*/ = $(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($([`foo`]));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "foo" ];
const b = $( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [`foo`];
let a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['foo']
 - 2: ['foo']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
