# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident unary typeof simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
export default a = typeof arg;
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:string*/ = `number`;
export { tmpAnonDefaultExport as default };
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = `number`;
export { tmpAnonDefaultExport as default };
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = "number";
export { a as default };
$( "number", 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = typeof arg;
const tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, arg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
