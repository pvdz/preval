# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f(arg = (a = typeof x)) {}
$(f());
$(a, x);
`````


## Settled


`````js filename=intro
$(undefined);
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( "number", 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let arg = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpNestedComplexRhs = typeof x;
    a = tmpNestedComplexRhs;
    arg = tmpNestedComplexRhs;
    return undefined;
  } else {
    arg = tmpParamBare;
    return undefined;
  }
};
let x = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
