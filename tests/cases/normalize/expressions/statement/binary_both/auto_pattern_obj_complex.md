# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Binary both > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$({ a: 1, b: 2 }) + $({ a: 1, b: 2 });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const tmpBinBothLhs /*:unknown*/ = $(tmpCalleeParam);
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$1);
tmpBinBothLhs + tmpBinBothRhs;
$(999);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 1, b: 2 }) + $({ a: 1, b: 2 });
$(999);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = {
  a: 1,
  b: 2,
};
const d = $( c );
b + d;
$( 999 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternObjRoot = { a: 999, b: 1000 };
let a = tmpBindingPatternObjRoot.a;
let tmpCalleeParam = { a: 1, b: 2 };
const tmpBinBothLhs = $(tmpCalleeParam);
let tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpBinBothRhs = $(tmpCalleeParam$1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { a: '1', b: '2' }
 - 3: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
