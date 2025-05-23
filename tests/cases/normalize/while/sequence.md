# Preval test case

# sequence.md

> Normalize > While > Sequence
>
> Test should be normalized

## Input

`````js filename=intro
let x = 1;
while (((x = x * 'str'), (x = x * 8), (x = x), (x = x * x), (x = x.x), x?.x(x))) {}
`````


## Settled


`````js filename=intro
let tmpClusterSSA_x /*:unknown*/ = $Number_prototype.x;
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_x == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementObject /*:unknown*/ = tmpClusterSSA_x.x;
  tmpIfTest = $dotCall(tmpChainElementObject, tmpClusterSSA_x, `x`, tmpClusterSSA_x);
}
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    tmpClusterSSA_x ** 0;
    tmpClusterSSA_x = NaN.x;
    let tmpIfTest$2 /*:unknown*/ /*ternaryConst*/ = undefined;
    const tmpIfTest$4 /*:boolean*/ = tmpClusterSSA_x == null;
    if (tmpIfTest$4) {
    } else {
      const tmpChainElementObject$1 /*:unknown*/ = tmpClusterSSA_x.x;
      tmpIfTest$2 = $dotCall(tmpChainElementObject$1, tmpClusterSSA_x, `x`, tmpClusterSSA_x);
    }
    if (tmpIfTest$2) {
    } else {
      break;
    }
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpClusterSSA_x = $Number_prototype.x;
let tmpIfTest = undefined;
if (!(tmpClusterSSA_x == null)) {
  tmpIfTest = tmpClusterSSA_x.x(tmpClusterSSA_x);
}
if (tmpIfTest) {
  while (true) {
    tmpClusterSSA_x ** 0;
    tmpClusterSSA_x = NaN.x;
    let tmpIfTest$2 = undefined;
    if (!(tmpClusterSSA_x == null)) {
      tmpIfTest$2 = tmpClusterSSA_x.x(tmpClusterSSA_x);
    }
    if (!tmpIfTest$2) {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $Number_prototype.x;
let b = undefined;
const c = a == null;
if (c) {

}
else {
  const d = a.x;
  b = $dotCall( d, a, "x", a );
}
if (b) {
  while ($LOOP_UNROLL_10) {
    a ** 0;
    a = NaN.x;
    let e = undefined;
    const f = a == null;
    if (f) {

    }
    else {
      const g = a.x;
      e = $dotCall( g, a, "x", a );
    }
    if (e) {

    }
    else {
      break;
    }
  }
}
`````


## Todos triggered


- (todo) do we want to support BinaryExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
