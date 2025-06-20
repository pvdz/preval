# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident logic and simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = 1 && 2)) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
$(undefined);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 2 );
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
    let tmpNestedComplexRhs = 1;
    if (tmpNestedComplexRhs) {
      tmpNestedComplexRhs = 2;
    } else {
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
