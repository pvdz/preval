# Preval test case

# var_body2.md

> Normalize > For > Forin > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
for(const n in {a: 1, b: 2}) var x = n;
$(x);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = undefined;
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    x = tmpForInNext.value;
  }
}
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = undefined;
const tmpForInGen = $forIn({ a: 1, b: 2 });
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    x = tmpForInNext.value;
  }
}
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = {
  a: 1,
  b: 2,
};
const c = $forIn( b );
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
