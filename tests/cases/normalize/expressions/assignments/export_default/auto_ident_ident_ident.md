# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Export default > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
export default a = b = 2;
$(a, b, c);
`````


## Settled


`````js filename=intro
const a /*:number*/ /*truthy*/ = 2;
export { a as default };
$(2, 2, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 2;
export { a as default };
$(2, 2, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 2;
export { a as default };
$( 2, 2, 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
a = 2;
const tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, b, c);
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
