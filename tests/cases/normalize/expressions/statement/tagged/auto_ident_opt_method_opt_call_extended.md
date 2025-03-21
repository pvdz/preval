# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Tagged > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$`before ${b?.c.d.e?.(1)} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest$1) {
  $(tmpCalleeParam, undefined);
  $(a);
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  $(tmpCalleeParam, tmpChainElementCall);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest$1 = $ == null;
const tmpCalleeParam = [`before `, ` after`];
const a = { a: 999, b: 1000 };
if (tmpIfTest$1) {
  $(tmpCalleeParam, undefined);
  $(a);
} else {
  $(tmpCalleeParam, $dotCall($, { e: $ }, `e`, 1));
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
const b = [ "before ", " after" ];
const c = {
  a: 999,
  b: 1000,
};
if (a) {
  $( b, undefined );
  $( c );
}
else {
  const d = { e: $ };
  const e = $dotCall( $, d, "e", 1 );
  $( b, e );
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
 - 2: ['before ', ' after'], 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
