# Preval test case

# unused_label.md

> Tofix > unused label

At the time of writing, this was leaving a label

## Input

`````js filename=intro
const f = function() {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const t = $(1, `return`);
    return t;
  }
  return undefined;
};
const s = f();
$(s);
`````


## Settled


`````js filename=intro
const tmpSSA_s /*:unknown*/ = $(1, `return`);
$(tmpSSA_s);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1, `return`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1, "return" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const t = $(1, `return`);
    return t;
  }
  return undefined;
};
const s = f();
$(s);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'return'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
