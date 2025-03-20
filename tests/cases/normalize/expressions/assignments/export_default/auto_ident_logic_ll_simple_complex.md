# Preval test case

# auto_ident_logic_ll_simple_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident logic ll simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = 0 || $($(1));
$(a);
`````


## Settled


`````js filename=intro
let tmpAnonDefaultExport /*:unknown*/ = 0;
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpAnonDefaultExport = 0;
const a = $($(1));
tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
const b = $( 1 );
const c = $( b );
a = c;
export { a as default };
$( c );
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
