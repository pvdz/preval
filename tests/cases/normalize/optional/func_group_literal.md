# Preval test case

# func_group_literal.md

> Normalize > Optional > Func group literal
>
> We shouldn't transform member expressions on group ending in a literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, 3)?.foo
  return $(y);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpClusterSSA_y /*:unknown*/ = $Number_prototype.foo;
const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(tmpClusterSSA_y);
$(tmpClusterSSA_tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($Number_prototype.foo));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.foo;
const b = $( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  const tmpChainRootProp = 3;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.foo;
    y = tmpChainElementObject;
  } else {
  }
  const tmpReturnArg = $(y);
  return tmpReturnArg;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
