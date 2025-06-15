# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Export default > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default b = $(2);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(2);
export { b as default };
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(2);
export { b as default };
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
export { a as default };
const b = {
  a: 999,
  b: 1000,
};
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = $(2);
const tmpAnonDefaultExport = b;
export { tmpAnonDefaultExport as default };
$(a, b);
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
