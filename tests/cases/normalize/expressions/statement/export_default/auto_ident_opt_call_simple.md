# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default $?.(1);
$(a);
`````


## Settled


`````js filename=intro
let tmpAnonDefaultExport /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
} else {
  tmpAnonDefaultExport = $(1);
}
export { tmpAnonDefaultExport as default };
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpAnonDefaultExport = undefined;
if (!($ == null)) {
  tmpAnonDefaultExport = $(1);
}
export { tmpAnonDefaultExport as default };
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {

}
else {
  a = $( 1 );
}
export { a as default };
const c = {
  a: 999,
  b: 1000,
};
$( c );
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
