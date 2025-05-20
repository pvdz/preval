# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Statement > Template > Auto ident opt method call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$(`before  ${b?.c.d.e(1)}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpCalleeParam$1 /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
const tmpStringConcatL /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpStringConcatL}  after`;
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  ${$dotCall($, { e: $ }, `e`, 1)}  after`);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { e: $ };
const b = $dotCall( $, a, "e", 1 );
const c = $coerce( b, "string" );
const d = `before  ${c}  after`;
$( d );
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'before 1 after'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
