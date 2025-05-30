# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Statement > Export default > Auto ident nested simple member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
export default b.x = b.x = b.x = b.x = b.x = b.x = c;
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:number*/ = 3;
export { tmpAnonDefaultExport as default };
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { x: 3 };
$(a, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = 3;
export { tmpAnonDefaultExport as default };
$({ a: 999, b: 1000 }, { x: 3 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 3;
export { a as default };
const b = {
  a: 999,
  b: 1000,
};
const c = { x: 3 };
$( b, c, 3 );
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
