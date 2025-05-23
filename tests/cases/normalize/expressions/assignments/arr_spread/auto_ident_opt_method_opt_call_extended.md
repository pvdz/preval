# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$([...(a = b?.c.d.e?.(1))]);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  a = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
const tmpCalleeParam /*:array*/ = [...a];
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
if (!($ == null)) {
  a = $dotCall($, { e: $ }, `e`, 1);
}
$([...a]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {

}
else {
  const c = { e: $ };
  a = $dotCall( $, c, "e", 1 );
}
const d = [ ...a ];
$( d );
$( a );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
