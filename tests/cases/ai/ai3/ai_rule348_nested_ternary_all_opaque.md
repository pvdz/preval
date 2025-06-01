# Preval test case

# ai_rule348_nested_ternary_all_opaque.md

> Ai > Ai3 > Ai rule348 nested ternary all opaque
>
> Test: Nested ternary operators with all conditions and values opaque.

## Input

`````js filename=intro
// Expected: (similar logic, likely expanded to if/else by preval)
let res = $('cond1') 
            ? ($('cond2') ? $('valA') : $('valB')) 
            : ($('cond3') ? $('valC') : $('valD'));
$('result', res);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`cond1`);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(`cond2`);
  if (tmpIfTest$1) {
    const tmpClusterSSA_res /*:unknown*/ = $(`valA`);
    $(`result`, tmpClusterSSA_res);
  } else {
    const tmpClusterSSA_res$1 /*:unknown*/ = $(`valB`);
    $(`result`, tmpClusterSSA_res$1);
  }
} else {
  const tmpIfTest$3 /*:unknown*/ = $(`cond3`);
  if (tmpIfTest$3) {
    const tmpClusterSSA_res$3 /*:unknown*/ = $(`valC`);
    $(`result`, tmpClusterSSA_res$3);
  } else {
    const tmpClusterSSA_res$5 /*:unknown*/ = $(`valD`);
    $(`result`, tmpClusterSSA_res$5);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`cond1`)) {
  if ($(`cond2`)) {
    $(`result`, $(`valA`));
  } else {
    $(`result`, $(`valB`));
  }
} else {
  if ($(`cond3`)) {
    $(`result`, $(`valC`));
  } else {
    $(`result`, $(`valD`));
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond1" );
if (a) {
  const b = $( "cond2" );
  if (b) {
    const c = $( "valA" );
    $( "result", c );
  }
  else {
    const d = $( "valB" );
    $( "result", d );
  }
}
else {
  const e = $( "cond3" );
  if (e) {
    const f = $( "valC" );
    $( "result", f );
  }
  else {
    const g = $( "valD" );
    $( "result", g );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let res = undefined;
const tmpIfTest = $(`cond1`);
if (tmpIfTest) {
  const tmpIfTest$1 = $(`cond2`);
  if (tmpIfTest$1) {
    res = $(`valA`);
    $(`result`, res);
  } else {
    res = $(`valB`);
    $(`result`, res);
  }
} else {
  const tmpIfTest$3 = $(`cond3`);
  if (tmpIfTest$3) {
    res = $(`valC`);
    $(`result`, res);
  } else {
    res = $(`valD`);
    $(`result`, res);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond1'
 - 2: 'cond2'
 - 3: 'valA'
 - 4: 'result', 'valA'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
