# Preval test case

# var_body2.md

> Normalize > For > Forof > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
for(const n of [1,2,3]) var x = n;
$(x);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = undefined;
const tmpCalleeParam /*:array*/ = [1, 2, 3];
const tmpForOfGenNext /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    x = tmpForOfNext.value;
  }
}
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = undefined;
const tmpForOfGenNext = $forOf([1, 2, 3]);
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    x = tmpForOfNext.value;
  }
}
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = [ 1, 2, 3 ];
const c = $forOf( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    a = d.value;
  }
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
let tmpCalleeParam = [1, 2, 3];
const tmpForOfGenNext = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGenNext();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const n = tmpForOfNext.value;
    x = n;
  }
}
$(x);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
