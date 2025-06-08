# Preval test case

# func_literal.md

> Normalize > Optional > Func literal
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
function f() {
  return $('foo'?.length);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(3);
$(tmpClusterSSA_tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = `foo`;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.length;
    tmpCalleeParam = tmpChainElementObject;
  } else {
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
