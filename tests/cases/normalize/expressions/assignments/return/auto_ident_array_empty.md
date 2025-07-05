# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Return > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = []);
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const a /*:array*/ /*truthy*/ = [];
$(a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = [];
$(a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  a = [];
  return a;
};
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - 2: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
