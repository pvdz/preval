# Preval test case

# splat.md

> Obj mutation > Splat
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
for (const a in blob) {
  const b = a;
  $(b);
}
$(blob);
`````


## Settled


`````js filename=intro
const blob /*:object*/ = { thing: `woop` };
const tmpForInGen /*:unknown*/ = $forIn(blob);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const a /*:unknown*/ = tmpForInNext.value;
    $(a);
  }
}
$(blob);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const blob = { thing: `woop` };
const tmpForInGen = $forIn(blob);
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    $(tmpForInNext.value);
  }
}
$(blob);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { thing: "woop" };
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = c.value;
    $( e );
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
 - 1: 'thing'
 - 2: { thing: '"woop"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
