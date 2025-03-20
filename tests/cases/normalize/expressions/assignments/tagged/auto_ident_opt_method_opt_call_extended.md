# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Tagged > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$`before ${(a = b?.c.d.e?.(1))} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
if (tmpIfTest$1) {
  $(tmpCalleeParam, undefined);
  $(undefined);
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  $(tmpCalleeParam, tmpChainElementCall);
  $(tmpChainElementCall);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest$1 = $ == null;
const tmpCalleeParam = [`before `, ` after`];
if (tmpIfTest$1) {
  $(tmpCalleeParam, undefined);
  $(undefined);
} else {
  const tmpChainElementCall = $dotCall($, { e: $ }, `e`, 1);
  $(tmpCalleeParam, tmpChainElementCall);
  $(tmpChainElementCall);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
const b = [ "before ", " after" ];
if (a) {
  $( b, undefined );
  $( undefined );
}
else {
  const c = { e: $ };
  const d = $dotCall( $, c, "e", 1 );
  $( b, d );
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
