# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident delete prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
export default delete arg.y;
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpAnonDefaultExport /*:boolean*/ = delete arg.y;
export { tmpAnonDefaultExport as default };
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpAnonDefaultExport = delete arg.y;
export { tmpAnonDefaultExport as default };
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = delete a.y;
export { b as default };
const c = {
  a: 999,
  b: 1000,
};
$( c, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = delete arg.y;
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
