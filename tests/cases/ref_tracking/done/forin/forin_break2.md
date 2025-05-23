# Preval test case

# forin_break2.md

> Ref tracking > Done > Forin > Forin break2
>
> bloop

## Input

`````js filename=intro
const wat = { a: 1, b: 2 };
for (const x in wat) {
  $(x);
  break;
}
$();
`````


## Settled


`````js filename=intro
const wat /*:object*/ = { a: 1, b: 2 };
const tmpForInGen /*:unknown*/ = $forIn(wat);
const tmpForInNext /*:unknown*/ = tmpForInGen();
const tmpIfTest /*:unknown*/ = tmpForInNext.done;
if (tmpIfTest) {
  $();
} else {
  const x /*:unknown*/ = tmpForInNext.value;
  $(x);
  $();
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn({ a: 1, b: 2 });
const tmpForInNext = tmpForInGen();
if (tmpForInNext.done) {
  $();
} else {
  $(tmpForInNext.value);
  $();
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $forIn( a );
const c = b();
const d = c.done;
if (d) {
  $();
}
else {
  const e = c.value;
  $( e );
  $();
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const wat = { a: 1, b: 2 };
const tmpForInGen = $forIn(wat);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x = tmpForInNext.value;
    $(x);
    break;
  }
}
$();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
