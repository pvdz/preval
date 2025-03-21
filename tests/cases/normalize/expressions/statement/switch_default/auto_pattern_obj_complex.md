# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Switch default > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    $({ a: 1, b: 2 });
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
$(tmpCalleeParam);
$(999);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$({ a: 1, b: 2 });
$(999);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = {
  a: 1,
  b: 2,
};
$( a );
$( 999 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '1', b: '2' }
 - 3: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
