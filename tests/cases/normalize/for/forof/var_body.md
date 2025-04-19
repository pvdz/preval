# Preval test case

# var_body.md

> Normalize > For > Forof > Var body
>
> Var as body of a do-while

## Input

`````js filename=intro
for(const n of [1,2,3]) var x = n;
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [1, 2, 3];
const tmpForOfGenNext /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGenNext = $forOf([1, 2, 3]);
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $forOf( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    c.value;
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
