# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Binary right > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$($(100) + ({ a } = $({ a: 1, b: 2 })));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const a /*:unknown*/ = tmpNestedAssignObjPatternRhs.a;
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpNestedAssignObjPatternRhs;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
const a = tmpNestedAssignObjPatternRhs.a;
$(tmpBinBothLhs + tmpNestedAssignObjPatternRhs);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  a: 1,
  b: 2,
};
const c = $( b );
const d = c.a;
const e = a + c;
$( e );
$( d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '1', b: '2' }
 - 3: '100[object Object]'
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
