# Preval test case

# auto_ident_new_prop_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident new prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = new b.$(1)) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
new $(1);
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
new $(1);
$(undefined);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
new $( 1 );
$( undefined );
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
 - 1: 1
 - 2: undefined
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
