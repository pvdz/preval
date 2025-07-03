# Preval test case

# forin_norm.md

> Ai > Ai5 > Forin norm
>
> Test for-in normalization

## Input

`````js filename=intro
const obj = { a: 1, b: 2 };
const keys = [];
for (let key in obj) {
    $(key);  // Track key
    keys.push(key);
}
$(keys);

// Expected:
// const obj = { a: 1, b: 2 };
// const keys = [];
// const iter = $forIn(obj);
// while (true) {
//     const key = iter.next();
//     if (key.done) {
//         break;
//     }
//     $(key.value);
//     keys.push(key.value);
// }
// $(keys);
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const tmpForInGen /*:unknown*/ = $forIn(obj);
const keys /*:array*/ /*truthy*/ = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const key /*:unknown*/ = tmpForInNext.value;
    $(key);
    $dotCall($array_push, keys, `push`, key);
  }
}
$(keys);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn({ a: 1, b: 2 });
const keys = [];
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    const key = tmpForInNext.value;
    $(key);
    $dotCall($array_push, keys, `push`, key);
  }
}
$(keys);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $forIn( a );
const c = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = b();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = d.value;
    $( f );
    $dotCall( $array_push, c, "push", f );
  }
}
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { a: 1, b: 2 };
const keys = [];
const tmpForInGen = $forIn(obj);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let key = tmpForInNext.value;
    $(key);
    const tmpMCF = keys.push;
    $dotCall(tmpMCF, keys, `push`, key);
  }
}
$(keys);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: ['a', 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
