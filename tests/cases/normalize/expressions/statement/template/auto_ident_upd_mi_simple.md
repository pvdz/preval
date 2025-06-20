# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > Template > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(`before  ${--b}  after`);
$(a, b);
`````


## Settled


`````js filename=intro
$(`before  0  after`);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  0  after`);
$({ a: 999, b: 1000 }, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before  0  after" );
const a = {
  a: 999,
  b: 1000,
};
$( a, 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent - 1;
let tmpCalleeParam$1 = b;
const tmpBinBothRhs = $coerce(b, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before 0 after'
 - 2: { a: '999', b: '1000' }, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
