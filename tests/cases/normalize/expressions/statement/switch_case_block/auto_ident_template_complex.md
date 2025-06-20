# Preval test case

# auto_ident_template_complex.md

> Normalize > Expressions > Statement > Switch case block > Auto ident template complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = `foo${$(1)}`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam, `string`);
const a /*:string*/ /*truthy*/ = `foo${tmpBinBothRhs}`;
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = `foo`;
let tmpCalleeParam = $(1);
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let a = $coerce(tmpBinLhs, `plustr`);
$(a);
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
