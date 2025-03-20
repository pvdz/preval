# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident cond s-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = (10, 20, 30) ? (40, 50, $(60)) : $($(100));
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(60);
const tmpAnonDefaultExport /*:unknown*/ = a;
export { tmpAnonDefaultExport as default };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(60);
const tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
const b = a;
export { b as default };
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
