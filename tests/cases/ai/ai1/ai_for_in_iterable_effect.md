# Preval test case

# ai_for_in_iterable_effect.md

> Ai > Ai1 > Ai for in iterable effect
>
> Test: for...in loop with side effect in the iterable expression.

## Input

`````js filename=intro
// Expected: $('iterable_effect') called once, then loop proceeds.
let log = '';
let obj = { a:1, b:2 }; // obj is simple for focus
for (let k in ($('iterable_effect'), obj)) {
  log += k;
}
$('final_log', log);
`````


## Settled


`````js filename=intro
let log /*:string*/ = ``;
$(`iterable_effect`);
const obj /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const tmpForInGen /*:unknown*/ = $forIn(obj);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const k /*:unknown*/ = tmpForInNext.value;
    log = log + k;
  }
}
$(`final_log`, log);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let log = ``;
$(`iterable_effect`);
const tmpForInGen = $forIn({ a: 1, b: 2 });
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    log = log + tmpForInNext.value;
  }
}
$(`final_log`, log);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = "";
$( "iterable_effect" );
const b = {
  a: 1,
  b: 2,
};
const c = $forIn( b );
while ($LOOP_NO_UNROLLS_LEFT) {
  const d = c();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = d.value;
    a = a + f;
  }
}
$( "final_log", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let log = ``;
let obj = { a: 1, b: 2 };
$(`iterable_effect`);
let tmpCalleeParam = obj;
const tmpForInGen = $forIn(obj);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForInNext = tmpForInGen();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let k = tmpForInNext.value;
    log = log + k;
  }
}
$(`final_log`, log);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'iterable_effect'
 - 2: 'final_log', 'ab'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
