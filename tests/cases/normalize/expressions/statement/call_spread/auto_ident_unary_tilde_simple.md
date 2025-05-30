# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident unary tilde simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(...~arg);
$(a, arg);
`````


## Settled


`````js filename=intro
$(...-2);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(...-2);
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( ...-2 );
const a = {
  a: 999,
  b: 1000,
};
$( a, 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
