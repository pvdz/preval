# Preval test case

# ai_rule325_for_loop_comma_update_opaque.md

> Ai > Ai3 > Ai rule325 for loop comma update opaque
>
> Test: Comma operator in for loop's update section with opaque values.

## Input

`````js filename=intro
// Expected: for (let i = $('init_i', 0); $('cond', i) < 2; i = ($('update1', i+1), $('update2', i+2)) ) { $('loop_body', i); }
let bound = $('bound', 2);
for (let i = $('init_i', 0); $('cond_val_i', i) < bound; i = ($('update1', i + 1), $('update2', i + 2)) ) {
  $('loop_body', i);
}
$('done');
`````


## Settled


`````js filename=intro
const bound /*:unknown*/ = $(`bound`, 2);
const i /*:unknown*/ = $(`init_i`, 0);
const tmpBinLhs /*:unknown*/ = $(`cond_val_i`, i);
const tmpIfTest /*:boolean*/ = tmpBinLhs < bound;
if (tmpIfTest) {
  $(`loop_body`, i);
  const tmpCalleeParam /*:primitive*/ = i + 1;
  $(`update1`, tmpCalleeParam);
  const tmpCalleeParam$1 /*:primitive*/ = i + 2;
  let tmpClusterSSA_i /*:unknown*/ = $(`update2`, tmpCalleeParam$1);
  while ($LOOP_UNROLL_10) {
    const tmpBinLhs$1 /*:unknown*/ = $(`cond_val_i`, tmpClusterSSA_i);
    const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$1 < bound;
    if (tmpIfTest$1) {
      $(`loop_body`, tmpClusterSSA_i);
      const tmpCalleeParam$2 /*:primitive*/ = tmpClusterSSA_i + 1;
      $(`update1`, tmpCalleeParam$2);
      const tmpCalleeParam$4 /*:primitive*/ = tmpClusterSSA_i + 2;
      tmpClusterSSA_i = $(`update2`, tmpCalleeParam$4);
    } else {
      break;
    }
  }
  $(`done`);
} else {
  $(`done`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const bound = $(`bound`, 2);
const i = $(`init_i`, 0);
if ($(`cond_val_i`, i) < bound) {
  $(`loop_body`, i);
  $(`update1`, i + 1);
  let tmpClusterSSA_i = $(`update2`, i + 2);
  while (true) {
    if ($(`cond_val_i`, tmpClusterSSA_i) < bound) {
      $(`loop_body`, tmpClusterSSA_i);
      $(`update1`, tmpClusterSSA_i + 1);
      tmpClusterSSA_i = $(`update2`, tmpClusterSSA_i + 2);
    } else {
      break;
    }
  }
  $(`done`);
} else {
  $(`done`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "bound", 2 );
const b = $( "init_i", 0 );
const c = $( "cond_val_i", b );
const d = c < a;
if (d) {
  $( "loop_body", b );
  const e = b + 1;
  $( "update1", e );
  const f = b + 2;
  let g = $( "update2", f );
  while ($LOOP_UNROLL_10) {
    const h = $( "cond_val_i", g );
    const i = h < a;
    if (i) {
      $( "loop_body", g );
      const j = g + 1;
      $( "update1", j );
      const k = g + 2;
      g = $( "update2", k );
    }
    else {
      break;
    }
  }
  $( "done" );
}
else {
  $( "done" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let bound = $(`bound`, 2);
let i = $(`init_i`, 0);
while (true) {
  const tmpBinLhs = $(`cond_val_i`, i);
  const tmpIfTest = tmpBinLhs < bound;
  if (tmpIfTest) {
    $(`loop_body`, i);
    let tmpCalleeParam = i + 1;
    $(`update1`, tmpCalleeParam);
    let tmpCalleeParam$1 = i + 2;
    i = $(`update2`, tmpCalleeParam$1);
  } else {
    break;
  }
}
$(`done`);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'bound', 2
 - 2: 'init_i', 0
 - 3: 'cond_val_i', 'init_i'
 - 4: 'done'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
