# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Param default > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f(p = (b = $(2))) {}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
const tmpSSA_b /*:unknown*/ = $(2);
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_b = $(2);
$(undefined);
$({ a: 999, b: 1000 }, tmpSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( undefined );
const b = {
  a: 999,
  b: 1000,
};
$( b, a );
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
    const tmpNestedComplexRhs = $(2);
    b = tmpNestedComplexRhs;
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
 - 1: 2
 - 2: undefined
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
