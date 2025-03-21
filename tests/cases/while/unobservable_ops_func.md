# Preval test case

# unobservable_ops_func.md

> While > Unobservable ops func
>
> A static operation that can not be observed inside the loop and is not depended on the loop count should be moved out.

## Input

`````js filename=intro
function f() {
  let s = $(10);
  let x = true;
  while (x) {
    const nowAssignable$3 = parseExpression(lexerFlags$285, astProp$181);
    s = s | 10; // This line can be moved outward since `s` can not be observed
    x = $(true);
  }
  $(s);
}
$(f());
$(f());
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const s /*:unknown*/ = $(10);
  parseExpression(lexerFlags$285, astProp$181);
  let tmpClusterSSA_s /*:number*/ = s | 10;
  const tmpClusterSSA_x /*:unknown*/ = $(true);
  if (tmpClusterSSA_x) {
    while ($LOOP_UNROLL_10) {
      parseExpression(lexerFlags$285, astProp$181);
      tmpClusterSSA_s = tmpClusterSSA_s | 10;
      const tmpClusterSSA_x$1 /*:unknown*/ = $(true);
      if (tmpClusterSSA_x$1) {
      } else {
        break;
      }
    }
    $(tmpClusterSSA_s);
    return undefined;
  } else {
    $(tmpClusterSSA_s);
    return undefined;
  }
};
f();
$(undefined);
f();
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const s = $(10);
  parseExpression(lexerFlags$285, astProp$181);
  let tmpClusterSSA_s = s | 10;
  if ($(true)) {
    while (true) {
      parseExpression(lexerFlags$285, astProp$181);
      tmpClusterSSA_s = tmpClusterSSA_s | 10;
      if (!$(true)) {
        break;
      }
    }
    $(tmpClusterSSA_s);
  } else {
    $(tmpClusterSSA_s);
  }
};
f();
$(undefined);
f();
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 10 );
  parseExpression( lexerFlags$285, astProp$181 );
  let c = b | 10;
  const d = $( true );
  if (d) {
    while ($LOOP_UNROLL_10) {
      parseExpression( lexerFlags$285, astProp$181 );
      c = c | 10;
      const e = $( true );
      if (e) {

      }
      else {
        break;
      }
    }
    $( c );
    return undefined;
  }
  else {
    $( c );
    return undefined;
  }
};
a();
$( undefined );
a();
$( undefined );
`````


## Todos triggered


None


## Globals


BAD@! Found 3 implicit global bindings:

parseExpression, lexerFlags$285, astProp$181


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
