# Preval test case

# auto_ident_prop_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = b.c);
}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
$(1);
const b /*:object*/ = { c: 1 };
$(1, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1, { c: 1 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { c: 1 };
$( 1, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  a = b.c;
  return a;
};
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
