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
const f /*:()=>undefined*/ = function () {
  debugger;
  return undefined;
};
const tmpAnonDefaultExport /*:unknown*/ = f;
export { tmpAnonDefaultExport as default };
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {};
const tmpAnonDefaultExport = f;
export { tmpAnonDefaultExport as default };
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
const b = a;
export { b as default };
$( a );
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
