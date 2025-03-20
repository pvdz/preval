# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Binary right > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(100) + $({ a: 1, b: 2 });
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam);
tmpBinBothLhs + tmpBinBothRhs;
$(999);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100) + $({ a: 1, b: 2 });
$(999);
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
a + c;
$( 999 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '1', b: '2' }
 - 3: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
