# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Statement > Template > Auto ident prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(1, 2, b).c}  after`);
$(a, b);
`````


## Settled


`````js filename=intro
$(`before  1  after`);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { c: 1 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  1  after`);
$({ a: 999, b: 1000 }, { c: 1 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before  1  after" );
const a = {
  a: 999,
  b: 1000,
};
const b = { c: 1 };
$( a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpCompObj = b;
let tmpCalleeParam$1 = tmpCompObj.c;
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
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
 - 1: 'before 1 after'
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
