# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = $?.(1);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
let tmpAnonDefaultExport /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
} else {
  a = $(1);
  tmpAnonDefaultExport = a;
}
export { tmpAnonDefaultExport as default };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpIfTest = $ == null;
let tmpAnonDefaultExport = undefined;
if (!tmpIfTest) {
  a = $(1);
  tmpAnonDefaultExport = a;
}
export { tmpAnonDefaultExport as default };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
let c = undefined;
if (b) {

}
else {
  a = $( 1 );
  c = a;
}
export { c as default };
$( a );
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
