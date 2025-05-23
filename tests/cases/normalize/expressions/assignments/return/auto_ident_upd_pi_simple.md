# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = ++b);
}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
$(2);
$(2, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(2, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( 2, 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent + 1;
  a = b;
  return a;
};
let b = 1;
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
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
