# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident opt complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f(p = $(b)?.x) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  tmpChainElementCall.x;
  $(undefined);
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $({ x: 1 });
if (tmpChainElementCall == null) {
  $(undefined);
} else {
  tmpChainElementCall.x;
  $(undefined);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
if (c) {
  $( undefined );
}
else {
  b.x;
  $( undefined );
}
const d = {
  a: 999,
  b: 1000,
};
$( d );
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
    p = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = $(b);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpChainElementObject = tmpChainElementCall.x;
      p = tmpChainElementObject;
      return undefined;
    } else {
      return undefined;
    }
  } else {
    p = tmpParamBare;
    return undefined;
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
 - 1: { x: '1' }
 - 2: undefined
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
