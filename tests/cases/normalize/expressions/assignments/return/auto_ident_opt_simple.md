# Preval test case

# auto_ident_opt_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident opt simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = b?.x);
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
$(1);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.x;
    a = tmpChainElementObject;
    return a;
  } else {
    return a;
  }
};
let b = { x: 1 };
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
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
