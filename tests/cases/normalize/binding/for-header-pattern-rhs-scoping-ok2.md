# Preval test case

# for-header-pattern-rhs-scoping-ok2.md

> Normalize > Binding > For-header-pattern-rhs-scoping-ok2
>
> The RHS of a for-of and for-in are scoped to the special for-header scope, not the scope that wraps the statement. As such, the `x` is tdz'd and it the `[x,y]` part should result in a runtime tdz error over accessing `x`.

## Input

`````js filename=intro
let y = {};
for (let [x] in [y]) {
  $(x);
}
`````


## Settled


`````js filename=intro
const y /*:object*/ /*truthy*/ = {};
const tmpCalleeParam /*:array*/ /*truthy*/ = [y];
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpBindingPatternArrRoot /*:unknown*/ = tmpForInNext.value;
    const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpBindingPatternArrRoot];
    const x /*:unknown*/ = tmpArrPatternSplat[0];
    $(x);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const y = {};
const tmpForInGen = $forIn([y]);
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpBindingPatternArrRoot = tmpForInNext.value;
    $([...tmpBindingPatternArrRoot][0]);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = [ a ];
const c = $forIn( b );
while ($LOOP_NO_UNROLLS_LEFT) {
  const d = c();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = d.value;
    const g = [ ...f ];
    const h = g[ 0 ];
    $( h );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let y = {};
let tmpCalleeParam = [y];
const tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForInNext = tmpForInGen();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let tmpBindingPatternArrRoot = tmpForInNext.value;
    let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
    let x = tmpArrPatternSplat[0];
    $(x);
  }
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '0'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
