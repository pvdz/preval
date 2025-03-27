# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident upd ip complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
export default a = $($(b)).x++;
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
const tmpAnonDefaultExport /*:unknown*/ = tmpUpdNum;
export { tmpAnonDefaultExport as default };
$(tmpUpdNum, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdNum = $coerce(tmpUpdObj.x, `number`);
tmpUpdObj.x = tmpUpdNum + 1;
const tmpAnonDefaultExport = tmpUpdNum;
export { tmpAnonDefaultExport as default };
$(tmpUpdNum, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = $coerce( d, "number" );
const f = e + 1;
c.x = f;
const g = e;
export { g as default };
$( e, a );
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
