# Preval test case

# func_assign_member.md

> Normalize > Nullish > Func assign member
>
> Assignment of a member expression where the object is a sequence

This could appear and is most likely a transformation artifact.

## Input

`````js filename=intro
function f() {
  var y;
  y = (1, 2, $())??foo;
  return $(y);
}
$(f());
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $();
const tmpIfTest /*:boolean*/ = y == null;
if (tmpIfTest) {
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(foo);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(y);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const y = $();
if (y == null) {
  $($(foo));
} else {
  $($(y));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = a == null;
if (b) {
  const c = $( foo );
  $( c );
}
else {
  const d = $( a );
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  y = $();
  const tmpIfTest = y == null;
  if (tmpIfTest) {
    y = foo;
  } else {
  }
  const tmpReturnArg = $(y);
  return tmpReturnArg;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


BAD@! Found 1 implicit global bindings:

foo


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
