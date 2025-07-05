# Preval test case

# func_nested_var.md

> Normalize > Nullish > Func nested var
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = (a, $(2))??toString,
        c = (1, b)??length
  return $(c);
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(2);
const tmpIfTest /*:boolean*/ = b == null;
let c /*:unknown*/ /*ternaryConst*/ = undefined;
let tmpIfTest$1 /*:boolean*/ /*ternaryConst*/ = false;
if (tmpIfTest) {
  c = toString;
  tmpIfTest$1 = c == null;
} else {
  c = b;
  tmpIfTest$1 = b == null;
}
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(length);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(c);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(2);
const tmpIfTest = b == null;
let c = undefined;
let tmpIfTest$1 = false;
if (tmpIfTest) {
  c = toString;
  tmpIfTest$1 = c == null;
} else {
  c = b;
  tmpIfTest$1 = b == null;
}
if (tmpIfTest$1) {
  $($(length));
} else {
  $($(c));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = a == null;
let c = undefined;
let d = false;
if (b) {
  c = toString;
  d = c == null;
}
else {
  c = a;
  d = a == null;
}
if (d) {
  const e = $( length );
  $( e );
}
else {
  const f = $( c );
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const a = 10;
  let b = $(2);
  const tmpIfTest = b == null;
  if (tmpIfTest) {
    b = toString;
  } else {
  }
  let c = b;
  const tmpIfTest$1 = c == null;
  if (tmpIfTest$1) {
    c = length;
  } else {
  }
  const tmpReturnArg = $(c);
  return tmpReturnArg;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


BAD@! Found 2 implicit global bindings:

toString, length


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
