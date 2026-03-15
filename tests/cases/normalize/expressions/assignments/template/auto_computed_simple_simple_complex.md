# Preval test case

# auto_computed_simple_simple_complex.md

> Normalize > Expressions > Assignments > Template > Auto computed simple simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = { b: $(1) })}  after`);
a["b"] = $(2);
$(a);
`````


## Settled


`````js filename=intro
$(1);
$(`before  [object Object]  after`);
const tmpAssignMemRhs /*:unknown*/ = $(2);
const a /*:object*/ /*truthy*/ = { b: tmpAssignMemRhs };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(`before  [object Object]  after`);
const tmpAssignMemRhs = $(2);
$({ b: tmpAssignMemRhs });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( "before  [object Object]  after" );
const a = $( 2 );
const b = { b: a };
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
const tmpAssignMemLhsObj = a;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````


## Todos triggered


- (todo) object concat blocked by invalidated reads


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'before [object Object] after'
 - 3: 2
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
