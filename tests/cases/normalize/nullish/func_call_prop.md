# Preval test case

# func_call_prop.md

> Normalize > Nullish > Func call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(parseInt(15)??foo);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(15);
$(tmpClusterSSA_tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(15));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 15 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = 15;
  const tmpIfTest = tmpCalleeParam == null;
  if (tmpIfTest) {
    tmpCalleeParam = foo;
  } else {
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support IfStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 15
 - 2: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
