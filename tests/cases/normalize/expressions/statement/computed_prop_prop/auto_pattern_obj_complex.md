# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
let obj = {};
obj[$({ a: 1, b: 2 })];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
$coerce(tmpCalleeParam, `string`);
$(999);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($({ a: 1, b: 2 }), `string`);
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
$coerce( b, "string" );
$( 999 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
