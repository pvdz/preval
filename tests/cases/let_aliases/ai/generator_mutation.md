# Preval test case

# generator_mutation.md

> Let aliases > Ai > Generator mutation
>
> Mutation in a generator function (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
function* gen() { x = "changed"; }
for (const _ of gen()) {}
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const gen /*:()=>object*/ = function* () {
  debugger;
  return undefined;
};
const x /*:unknown*/ = $(`val`);
const tmpCalleeParam /*:object*/ /*truthy*/ = gen();
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
$(x, `changed`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const gen = function* () {};
const x = $(`val`);
const tmpForOfGenNext = $forOf(gen());
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(x, `changed`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function *() {
  debugger;
  return undefined;
};
const b = $( "val" );
const c = a();
const d = $forOf( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    e.value;
  }
}
$( b, "changed" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let gen = function* () {
  debugger;
  x = `changed`;
  return undefined;
};
let x = $(`val`);
const a = x;
let tmpCalleeParam = gen();
const tmpForOfGenNext = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGenNext();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const _ = tmpForOfNext.value;
  }
}
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) inline generator functions safely (because yield)


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
