# Preval test case

# func_assign_member2.md

> Normalize > Optional > Func assign member2
>
> Assignment of a member expression where the object is a sequence

This could appear and is most likely a transformation artifact.

## Input

`````js filename=intro
function f() {
  var y;
  y = (1, 2, $({foo: 10}))?.foo;
  return $(y);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { foo: 10 };
const tmpChainRootProp /*:unknown*/ = $(tmpCalleeParam);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest) {
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(undefined);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpClusterSSA_y /*:unknown*/ = tmpChainRootProp.foo;
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(tmpClusterSSA_y);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainRootProp = $({ foo: 10 });
if (tmpChainRootProp == null) {
  $($(undefined));
} else {
  $($(tmpChainRootProp.foo));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { foo: 10 };
const b = $( a );
const c = b == null;
if (c) {
  const d = $( undefined );
  $( d );
}
else {
  const e = b.foo;
  const f = $( e );
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  y = undefined;
  let tmpCalleeParam = { foo: 10 };
  const tmpChainRootProp = $(tmpCalleeParam);
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.foo;
    y = tmpChainElementObject;
  } else {
  }
  const tmpReturnArg = $(y);
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
 - 1: { foo: '10' }
 - 2: 10
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
