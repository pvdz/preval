# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Param default > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = function f() {})) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpSSA_a /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
$(undefined);
$(tmpSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_a = function $pcompiled() {};
$(undefined);
$(tmpSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled() {
  debugger;
  return undefined;
};
$( undefined );
$( a );
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
    let f$1 = function () {
      debugger;
      return undefined;
    };
    const tmpNestedComplexRhs = f$1;
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
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
