# Preval test case

# auto_ident_cond_simple_simple_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident cond simple simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(1 ? 2 : $($(100))));
$(a);
`````


## Settled


`````js filename=intro
$(...2);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(...2);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( ...2 );
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
