# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Export default > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = function f() {};
$(a);
`````


## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
export { a as default };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function $pcompiled() {};
export { a as default };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  return undefined;
};
export { a as default };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const f = function () {
  debugger;
  return undefined;
};
a = f;
const tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
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
