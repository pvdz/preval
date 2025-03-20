# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) || (a = function f() {}));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
} else {
  const f /*:()=>undefined*/ = function () {
    debugger;
    return undefined;
  };
  $(f);
  $(f);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 });
} else {
  const f = function () {};
  $(f);
  $(f);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( a );
  const b = {
    a: 999,
    b: 1000,
  };
  $( b );
}
else {
  const c = function() {
    debugger;
    return undefined;
  };
  $( c );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
