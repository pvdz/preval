# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Call spread > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(1 && $($(1))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpClusterSSA_tmpCalleeParamSpread /*:unknown*/ = $(tmpCalleeParam);
$(...tmpClusterSSA_tmpCalleeParamSpread);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpCalleeParamSpread = $($(1));
$(...tmpClusterSSA_tmpCalleeParamSpread);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
$( ...b );
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
