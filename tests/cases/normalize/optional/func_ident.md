# Preval test case

# func_ident.md

> Normalize > Optional > Func ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(global?.foo);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = global == null;
if (tmpIfTest) {
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(undefined);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpChainElementObject /*:unknown*/ = global.foo;
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(tmpChainElementObject);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (global == null) {
  $($(undefined));
} else {
  $($(global.foo));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = global == null;
if (a) {
  const b = $( undefined );
  $( b );
}
else {
  const c = global.foo;
  const d = $( c );
  $( d );
}
`````


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
