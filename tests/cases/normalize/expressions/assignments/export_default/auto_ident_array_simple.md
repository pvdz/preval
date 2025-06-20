# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = [1, 2, 3];
$(a);
`````


## Settled


`````js filename=intro
const a /*:array*/ /*truthy*/ = [1, 2, 3];
export { a as default };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = [1, 2, 3];
export { a as default };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
export { a as default };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
const tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExportNamedDeclaration
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
