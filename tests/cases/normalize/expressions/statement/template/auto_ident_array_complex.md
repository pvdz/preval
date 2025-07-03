# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > Template > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${[$(1), 2, $(3)]}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(1);
const tmpArrElement$3 /*:unknown*/ = $(3);
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [tmpArrElement, 2, tmpArrElement$3];
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const tmpCalleeParam /*:string*/ /*truthy*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
$(`before  ${[tmpArrElement, 2, tmpArrElement$3]}  after`);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = [ a, 2, b ];
const d = $coerce( c, "string" );
const e = `before  ${d}  after`;
$( e );
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
let tmpCalleeParam$1 = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 'before 1,2,3 after'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
