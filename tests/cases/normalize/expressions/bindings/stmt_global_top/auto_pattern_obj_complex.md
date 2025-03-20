# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto pattern obj complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let { a } = $({ a: 1, b: 2 });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const bindingPatternObjRoot /*:unknown*/ = $(tmpCalleeParam);
const a /*:unknown*/ = bindingPatternObjRoot.a;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($({ a: 1, b: 2 }).a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = b.a;
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
