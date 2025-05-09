# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
function f(p = (a = b?.c.d.e?.(1))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest$3 /*:boolean*/ = $ == null;
if (tmpIfTest$3) {
  $(undefined);
  $(undefined);
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  const tmpNestedComplexRhs /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  $(undefined);
  $(tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($ == null) {
  $(undefined);
  $(undefined);
} else {
  const tmpNestedComplexRhs = $dotCall($, { e: $ }, `e`, 1);
  $(undefined);
  $(tmpNestedComplexRhs);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
if (a) {
  $( undefined );
  $( undefined );
}
else {
  const b = { e: $ };
  const c = $dotCall( $, b, "e", 1 );
  $( undefined );
  $( c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
