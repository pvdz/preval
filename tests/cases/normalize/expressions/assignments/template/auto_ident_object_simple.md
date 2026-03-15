# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = { x: 1, y: 2, z: 3 })}  after`);
$(a);
`````


## Settled


`````js filename=intro
$(`before  [object Object]  after`);
const a /*:object*/ /*truthy*/ = { x: 1, y: 2, z: 3 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  [object Object]  after`);
$({ x: 1, y: 2, z: 3 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before  [object Object]  after" );
const a = {
  x: 1,
  y: 2,
  z: 3,
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
a = { x: 1, y: 2, z: 3 };
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) object concat blocked by invalidated reads


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before [object Object] after'
 - 2: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
