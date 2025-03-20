# Preval test case

# auto_ident_template_complex.md

> Normalize > Expressions > Statement > Logic and right > Auto ident template complex
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
const tmpBinLhs /*:string*/ = `foo${tmpBinBothRhs}`;
$(tmpBinLhs);
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
