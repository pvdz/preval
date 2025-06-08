# Preval test case

# for_in_known_object.md

> Tofix > for in known object
>
> If we know the object then we should be able to simplify $forIn

## Input

`````js filename=intro
const obj = { x: 1, y: 'two' };
for (const key in obj) {
  $('key', key);
}
$('done');
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = { x: 1, y: `two` };
const tmpForInGen /*:unknown*/ = $forIn(obj);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const key /*:unknown*/ = tmpForInNext.value;
    $(`key`, key);
  }
}
$(`done`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn({ x: 1, y: `two` });
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    $(`key`, tmpForInNext.value);
  }
}
$(`done`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: "two",
};
const b = $forIn( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = c.value;
    $( "key", e );
  }
}
$( "done" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { x: 1, y: `two` };
const tmpForInGen = $forIn(obj);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const key = tmpForInNext.value;
    $(`key`, key);
  }
}
$(`done`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'key', 'x'
 - 2: 'key', 'y'
 - 3: 'done'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
