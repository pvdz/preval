# Preval test case

# auto_ident_template_complex.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident template complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = `foo${$(1)}`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam, `string`);
const a /*:string*/ = `foo${tmpBinBothRhs}`;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo${$(1)}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $coerce( a, "string" );
const c = `foo${b}`;
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'foo1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
