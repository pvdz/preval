# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident delete prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f(p = delete arg.y) {}
$(f());
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
delete arg.y;
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
delete arg.y;
$(undefined);
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
delete a.y;
$( undefined );
const b = {
  a: 999,
  b: 1000,
};
$( b, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
