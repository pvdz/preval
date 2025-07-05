# Preval test case

# ai_comma_op_loop_conditions_increments2.md

> Promises > Ai comma op loop conditions increments2
>
> Test: Comma operator in loop conditions/increments with opaque expressions.

## Input

`````js filename=intro
// Expected: All parts of comma expressions evaluated correctly. Loop condition uses last value.
let log = [];
let iter_count = 0;
for (let i = ($spy('init_i_effect'), $spy('init_i_val', 0)), j = ($spy('init_j_effect'), $spy('init_j_val', 5));
     ($('cond_eff1', i), $('cond_eff2', j > 0 && i < $('cond_i_limit', 3))); // Condition is value of last expr
     i++, $('inc_i_effect', i), j--, $('inc_j_effect', j), iter_count++) {
  log.push('loop_body_i=' + i + '_j=' + j);
  $('loop_body_effect', i, j);
}
$('comma_loop_log', log.join('|'));
$('iterations_run', iter_count);
`````


## Settled


`````js filename=intro
let iter_count /*:number*/ = 0;
$spy(`init_i_effect`);
const i /*:unknown*/ = $spy(`init_i_val`, 0);
$spy(`init_j_effect`);
const j /*:unknown*/ = $spy(`init_j_val`, 5);
$(`cond_eff1`, i);
const tmpCalleeParam /*:boolean*/ = j > 0;
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpCalleeParam) {
  const tmpBinBothRhs /*:unknown*/ = $(`cond_i_limit`, 3);
  const tmpClusterSSA_tmpCalleeParam /*:boolean*/ = i < tmpBinBothRhs;
  tmpIfTest = $(`cond_eff2`, tmpClusterSSA_tmpCalleeParam);
} else {
  tmpIfTest = $(`cond_eff2`, false);
}
const log /*:array*/ /*truthy*/ = [];
if (tmpIfTest) {
  const tmpStringConcatL$1 /*:string*/ = $coerce(i, `plustr`);
  const tmpBinLhs /*:string*/ /*truthy*/ = `loop_body_i=${tmpStringConcatL$1}_j=`;
  const tmpMCP /*:string*/ = tmpBinLhs + j;
  $dotCall($array_push, log, `push`, tmpMCP);
  $(`loop_body_effect`, i, j);
  const tmpPostUpdArgIdent /*:number*/ = $coerce(i, `number`);
  let tmpClusterSSA_i$1 /*:number*/ = tmpPostUpdArgIdent + 1;
  $(`inc_i_effect`, tmpClusterSSA_i$1);
  const tmpPostUpdArgIdent$1 /*:number*/ = $coerce(j, `number`);
  let tmpClusterSSA_j$1 /*:number*/ = tmpPostUpdArgIdent$1 - 1;
  $(`inc_j_effect`, tmpClusterSSA_j$1);
  iter_count = 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    $(`cond_eff1`, tmpClusterSSA_i$1);
    const tmpCalleeParam$2 /*:boolean*/ = tmpClusterSSA_j$1 > 0;
    let tmpIfTest$1 /*:unknown*/ /*ternaryConst*/ = undefined;
    if (tmpCalleeParam$2) {
      const tmpBinBothRhs$1 /*:unknown*/ = $(`cond_i_limit`, 3);
      const tmpClusterSSA_tmpCalleeParam$1 /*:boolean*/ = tmpClusterSSA_i$1 < tmpBinBothRhs$1;
      tmpIfTest$1 = $(`cond_eff2`, tmpClusterSSA_tmpCalleeParam$1);
    } else {
      tmpIfTest$1 = $(`cond_eff2`, false);
    }
    if (tmpIfTest$1) {
      const tmpMCP$1 /*:string*/ /*truthy*/ = `loop_body_i=${tmpClusterSSA_i$1}_j=${tmpClusterSSA_j$1}`;
      $dotCall($array_push, log, `push`, tmpMCP$1);
      $(`loop_body_effect`, tmpClusterSSA_i$1, tmpClusterSSA_j$1);
      tmpClusterSSA_i$1 = tmpClusterSSA_i$1 + 1;
      $(`inc_i_effect`, tmpClusterSSA_i$1);
      tmpClusterSSA_j$1 = tmpClusterSSA_j$1 - 1;
      $(`inc_j_effect`, tmpClusterSSA_j$1);
      iter_count = iter_count + 1;
    } else {
      break;
    }
  }
} else {
}
const tmpCalleeParam$1 /*:string*/ = $dotCall($array_join, log, `join`, `|`);
$(`comma_loop_log`, tmpCalleeParam$1);
$(`iterations_run`, iter_count);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let iter_count = 0;
$spy(`init_i_effect`);
const i = $spy(`init_i_val`, 0);
$spy(`init_j_effect`);
const j = $spy(`init_j_val`, 5);
$(`cond_eff1`, i);
const tmpCalleeParam = j > 0;
let tmpIfTest = undefined;
if (tmpCalleeParam) {
  tmpIfTest = $(`cond_eff2`, i < $(`cond_i_limit`, 3));
} else {
  tmpIfTest = $(`cond_eff2`, false);
}
const log = [];
if (tmpIfTest) {
  const tmpStringConcatL$1 = i + ``;
  $dotCall($array_push, log, `push`, `loop_body_i=${tmpStringConcatL$1}_j=` + j);
  $(`loop_body_effect`, i, j);
  let tmpClusterSSA_i$1 = Number(i) + 1;
  $(`inc_i_effect`, tmpClusterSSA_i$1);
  let tmpClusterSSA_j$1 = Number(j) - 1;
  $(`inc_j_effect`, tmpClusterSSA_j$1);
  iter_count = 1;
  while (true) {
    $(`cond_eff1`, tmpClusterSSA_i$1);
    const tmpCalleeParam$2 = tmpClusterSSA_j$1 > 0;
    let tmpIfTest$1 = undefined;
    if (tmpCalleeParam$2) {
      tmpIfTest$1 = $(`cond_eff2`, tmpClusterSSA_i$1 < $(`cond_i_limit`, 3));
    } else {
      tmpIfTest$1 = $(`cond_eff2`, false);
    }
    if (tmpIfTest$1) {
      $dotCall($array_push, log, `push`, `loop_body_i=${tmpClusterSSA_i$1}_j=${tmpClusterSSA_j$1}`);
      $(`loop_body_effect`, tmpClusterSSA_i$1, tmpClusterSSA_j$1);
      tmpClusterSSA_i$1 = tmpClusterSSA_i$1 + 1;
      $(`inc_i_effect`, tmpClusterSSA_i$1);
      tmpClusterSSA_j$1 = tmpClusterSSA_j$1 - 1;
      $(`inc_j_effect`, tmpClusterSSA_j$1);
      iter_count = iter_count + 1;
    } else {
      break;
    }
  }
}
$(`comma_loop_log`, $dotCall($array_join, log, `join`, `|`));
$(`iterations_run`, iter_count);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
$spy( "init_i_effect" );
const b = $spy( "init_i_val", 0 );
$spy( "init_j_effect" );
const c = $spy( "init_j_val", 5 );
$( "cond_eff1", b );
const d = c > 0;
let e = undefined;
if (d) {
  const f = $( "cond_i_limit", 3 );
  const g = b < f;
  e = $( "cond_eff2", g );
}
else {
  e = $( "cond_eff2", false );
}
const h = [];
if (e) {
  const i = $coerce( b, "plustr" );
  const j = `loop_body_i=${i}_j=`;
  const k = j + c;
  $dotCall( $array_push, h, "push", k );
  $( "loop_body_effect", b, c );
  const l = $coerce( b, "number" );
  let m = l + 1;
  $( "inc_i_effect", m );
  const n = $coerce( c, "number" );
  let o = n - 1;
  $( "inc_j_effect", o );
  a = 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    $( "cond_eff1", m );
    const p = o > 0;
    let q = undefined;
    if (p) {
      const r = $( "cond_i_limit", 3 );
      const s = m < r;
      q = $( "cond_eff2", s );
    }
    else {
      q = $( "cond_eff2", false );
    }
    if (q) {
      const t = `loop_body_i=${m}_j=${o}`;
      $dotCall( $array_push, h, "push", t );
      $( "loop_body_effect", m, o );
      m = m + 1;
      $( "inc_i_effect", m );
      o = o - 1;
      $( "inc_j_effect", o );
      a = a + 1;
    }
    else {
      break;
    }
  }
}
const u = $dotCall( $array_join, h, "join", "|" );
$( "comma_loop_log", u );
$( "iterations_run", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let log = [];
let iter_count = 0;
$spy(`init_i_effect`);
let i = $spy(`init_i_val`, 0);
$spy(`init_j_effect`);
let j = $spy(`init_j_val`, 5);
while (true) {
  $(`cond_eff1`, i);
  let tmpCalleeParam = j > 0;
  if (tmpCalleeParam) {
    const tmpBinBothLhs = i;
    const tmpBinBothRhs = $(`cond_i_limit`, 3);
    tmpCalleeParam = tmpBinBothLhs < tmpBinBothRhs;
  } else {
  }
  const tmpIfTest = $(`cond_eff2`, tmpCalleeParam);
  if (tmpIfTest) {
    const tmpMCF = log.push;
    const tmpStringConcatL = $coerce(i, `plustr`);
    const tmpBinLhs$1 = `loop_body_i=${tmpStringConcatL}`;
    const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
    const tmpBinLhs = `${tmpStringConcatR}_j=`;
    const tmpMCP = tmpBinLhs + j;
    $dotCall(tmpMCF, log, `push`, tmpMCP);
    $(`loop_body_effect`, i, j);
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
    $(`inc_i_effect`, i);
    const tmpPostUpdArgIdent$1 = $coerce(j, `number`);
    j = tmpPostUpdArgIdent$1 - 1;
    $(`inc_j_effect`, j);
    const tmpPostUpdArgIdent$3 = $coerce(iter_count, `number`);
    iter_count = tmpPostUpdArgIdent$3 + 1;
  } else {
    break;
  }
}
const tmpMCF$1 = log.join;
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, log, `join`, `|`);
$(`comma_loop_log`, tmpCalleeParam$1);
$(`iterations_run`, iter_count);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) access object property that also exists on prototype? $array_join
- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init CallExpression
- (todo) find test case where template ends up with multiple expressions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['init_i_effect', 'init_i_effect']
 - 2: 'Creating spy', 2, 2, ['init_i_val', 0]
 - 3: 'Creating spy', 3, 1, ['init_j_effect', 'init_j_effect']
 - 4: 'Creating spy', 4, 2, ['init_j_val', 5]
 - 5: 'cond_eff1', '<spy[2]>'
 - 6: '$spy[4].valueOf()', 5
 - 7: 'cond_i_limit', 3
 - 8: '$spy[2].valueOf()', 0
 - 9: 'cond_eff2', false
 - 10: '$spy[2].valueOf()', 0
 - 11: '$spy[4].valueOf()', 5
 - 12: 'loop_body_effect', '<spy[2]>', '<spy[4]>'
 - 13: '$spy[2].valueOf()', 0
 - 14: 'inc_i_effect', 1
 - 15: '$spy[4].valueOf()', 5
 - 16: 'inc_j_effect', 4
 - 17: 'cond_eff1', 1
 - 18: 'cond_i_limit', 3
 - 19: 'cond_eff2', false
 - 20: 'loop_body_effect', 1, 4
 - 21: 'inc_i_effect', 2
 - 22: 'inc_j_effect', 3
 - 23: 'cond_eff1', 2
 - 24: 'cond_i_limit', 3
 - 25: 'cond_eff2', false
 - 26: 'loop_body_effect', 2, 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
