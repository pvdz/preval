# Preval test case

# try_finally_forof_break.md

> Try > Finally > Try finally forof break
>
> Finally transform checks

## Input

`````js filename=intro
for (const x of ['a', 'b', 'c']) {
  try {
    $(x, 1);
  } finally {
    $(2);
    break;
  }
}
$(3);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`a`, `b`, `c`];
const tmpForOfGenNext /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x /*:unknown*/ = tmpForOfNext.value;
    try {
      $(x, 1);
    } catch ($finalImplicit) {}
    $(2);
    break;
  }
}
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGenNext = $forOf([`a`, `b`, `c`]);
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    const x = tmpForOfNext.value;
    try {
      $(x, 1);
    } catch ($finalImplicit) {}
    $(2);
    break;
  }
}
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
const b = $forOf( a );
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
    break;
  }
}
$( 3 );
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) support array reads statement type VarStatement


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
