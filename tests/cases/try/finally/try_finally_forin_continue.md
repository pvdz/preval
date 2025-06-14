# Preval test case

# try_finally_forin_continue.md

> Try > Finally > Try finally forin continue
>
> Finally transform checks

## Input

`````js filename=intro
for (const x in {a: 1}) {
  try {
    $(x, 1);
  } finally {
    $(2);
    continue;
  }
}
$(3);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x /*:unknown*/ = tmpForInNext.value;
    try {
      $(x, 1);
    } catch ($finalImplicit) {}
    $(2);
  }
}
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn({ a: 1 });
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    const x = tmpForInNext.value;
    try {
      $(x, 1);
    } catch ($finalImplicit) {}
    $(2);
  }
}
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: 1 };
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = c.value;
    try {
      $( e, 1 );
    }
    catch (f) {

    }
    $( 2 );
  }
}
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { a: 1 };
const tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x = tmpForInNext.value;
    let $implicitThrow = false;
    let $finalCatchArg = undefined;
    try {
      $(x, 1);
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
    $(2);
  }
}
$(3);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a', 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
