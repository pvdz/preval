# Preval test case

# for-header-pattern-rhs-scoping-tdz.md

> Normalize > Binding > For-header-pattern-rhs-scoping-tdz
>
> The RHS of a for-of and for-in are scoped to the special for-header scope, not the scope that wraps the statement. As such, the `x` is tdz'd and it the `[x,y]` part should result in a runtime tdz error over accessing `x`.

This should crash during eval

## Options

Known TDZ problem

- skipEval
- globals: x$1

## Input

`````js filename=intro
let x = 1;
let y = 1;
for (let [x] in [x]) {
  let y = 2;
  $(x);
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [x$1];
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpBindingPatternArrRoot /*:unknown*/ = tmpForInNext.value;
    const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
    const x$2 /*:unknown*/ = tmpArrPatternSplat[0];
    $(x$2);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn([x$1]);
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
const a = [ x$1 ];
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = c.value;
    const f = [ ...e ];
    const g = f[ 0 ];
    $( g );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 1;
let tmpCalleeParam = [x$1];
const tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let tmpBindingPatternArrRoot = tmpForInNext.value;
    let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
    let x$2 = tmpArrPatternSplat[0];
    let y$1 = 2;
    $(x$2);
  }
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
