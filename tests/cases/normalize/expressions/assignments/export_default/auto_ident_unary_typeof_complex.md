# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
export default a = typeof $(arg);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const a /*:string*/ /*truthy*/ = typeof tmpUnaryArg;
export { a as default };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
const a = typeof tmpUnaryArg;
export { a as default };
$(a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
export { b as default };
$( b, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
const tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, arg);
`````


## Todos triggered


- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? ExportNamedDeclaration


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
