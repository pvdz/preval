# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f(p = (a = --b)) {}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
$(undefined);
$(0, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(0, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 0, 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpPostUpdArgIdent = $coerce(b, `number`);
    b = tmpPostUpdArgIdent - 1;
    const tmpNestedComplexRhs = b;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
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
 - 1: undefined
 - 2: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
