# Preval test case

# func_nested.md

> Normalize > Optional > Func nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  return $(obj?.a?.b);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:unknown*/ = $();
const tmpReturnArg /*:unknown*/ = $(tmpObjLitVal$1);
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($()));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = $( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.a;
    const tmpIfTest$1 = tmpChainElementObject != null;
    if (tmpIfTest$1) {
      const tmpChainElementObject$1 = tmpChainElementObject.b;
      tmpCalleeParam = tmpChainElementObject$1;
    } else {
    }
  } else {
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
