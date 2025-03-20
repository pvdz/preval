# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident call computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
export default a = b[$("$")](1);
$(a);
`````


## Settled


`````js filename=intro
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = b[tmpCallCompProp](1);
const tmpAnonDefaultExport /*:unknown*/ = a;
export { tmpAnonDefaultExport as default };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompProp = $(`\$`);
const a = { $: $ }[tmpCallCompProp](1);
const tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ]( 1 );
const d = c;
export { d as default };
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
