# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Export default > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
export default b[$("c")];
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const tmpAnonDefaultExport /*:unknown*/ = b[tmpCompProp];
export { tmpAnonDefaultExport as default };
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $(`c`);
const b = { c: 1 };
const tmpAnonDefaultExport = b[tmpCompProp];
export { tmpAnonDefaultExport as default };
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
export { c as default };
const d = {
  a: 999,
  b: 1000,
};
$( d, b );
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
