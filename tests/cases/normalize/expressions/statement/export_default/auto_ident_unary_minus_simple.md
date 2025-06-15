# Preval test case

# auto_ident_unary_minus_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident unary minus simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
export default -arg;
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:number*/ /*truthy*/ = -1;
export { tmpAnonDefaultExport as default };
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = -1;
export { tmpAnonDefaultExport as default };
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = -1;
export { a as default };
const b = {
  a: 999,
  b: 1000,
};
$( b, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = -arg;
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
