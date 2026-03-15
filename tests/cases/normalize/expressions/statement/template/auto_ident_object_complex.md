# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Template > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${{ x: $(1), y: 2, z: $(3) }}  after`);
$(a);
`````


## Settled


`````js filename=intro
$(1);
$(3);
$(`before  [object Object]  after`);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(3);
$(`before  [object Object]  after`);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 3 );
$( "before  [object Object]  after" );
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
let tmpCalleeParam$1 = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 'before [object Object] after'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
