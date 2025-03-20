# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Template > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$(`before  ${(a = b?.c.d.e?.(1))}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
  $(`before  undefined  after`);
  $(undefined);
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $coerce(tmpChainElementCall, `string`);
  const tmpClusterSSA_tmpCalleeParam /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpChainElementCall);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($ == null) {
  $(`before  undefined  after`);
  $(undefined);
} else {
  const tmpChainElementCall = $dotCall($, { e: $ }, `e`, 1);
  $(`before  ${tmpChainElementCall}  after`);
  $(tmpChainElementCall);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
if (a) {
  $( "before  undefined  after" );
  $( undefined );
}
else {
  const b = { e: $ };
  const c = $dotCall( $, b, "e", 1 );
  const d = $coerce( c, "string" );
  const e = `before  ${d}  after`;
  $( e );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'before 1 after'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
