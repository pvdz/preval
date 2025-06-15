# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default --b;
$(a, b);
`````


## Settled


`````js filename=intro
const tmpSSA_b /*:number*/ /*falsy*/ = 0;
export { tmpSSA_b as default };
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_b = 0;
export { tmpSSA_b as default };
$({ a: 999, b: 1000 }, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 0;
export { a as default };
const b = {
  a: 999,
  b: 1000,
};
$( b, 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent - 1;
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
