# Preval test case

# ai_rule379_catch_conditional_rethrow_opaque.md

> Ai > Ai3 > Ai rule379 catch conditional rethrow opaque
>
> Globals: $

## Input

`````js filename=intro
// Output:
// log: throwing error 1
// log: caught error 1, rethrowing: true
// log: caught outer: Error: Original Error 1
// log: throwing error 2
// log: caught error 2, rethrowing: false
// log: final_val after err2: initial_val_modified_in_catch2
// log: throwing error 3
// log: caught error 3, rethrowing: false
// log: final_val after err3: modified_by_inner_catch3_outer_try_continued

let final_val = "initial_val";

try {
  $('log', "throwing error 1");
  try {
    throw new Error("Original Error 1");
  } catch (e) {
    const shouldRethrow = $('should_rethrow1', true);
    $('log', `caught error 1, rethrowing: ${shouldRethrow}`);
    if (shouldRethrow) {
      throw e;
    }
    final_val = "initial_val_modified_in_catch1"; // Should not be reached
  }
} catch (outer_e) {
  $('log', `caught outer: ${outer_e}`);
}

try {
  $('log', "throwing error 2");
  throw new Error("Original Error 2");
} catch (e) {
  const shouldRethrow = $('should_rethrow2', false);
  $('log', `caught error 2, rethrowing: ${shouldRethrow}`);
  if (shouldRethrow) {
    throw e; // Should not be taken
  }
  final_val = "initial_val_modified_in_catch2";
}
$('log', `final_val after err2: ${final_val}`);


let final_val2 = "initial_val_for_err3";
try {
  $('log', "throwing error 3");
   try {
       throw new Error("Original Error 3");
   } catch (e_inner) {
       const rethrowDecision = $("rethrow_inner_3", false);
       $('log', `caught error 3, rethrowing: ${rethrowDecision}`);
       if (rethrowDecision) {
           throw e_inner;
       }
       final_val2 = "modified_by_inner_catch3";
   }
   final_val2 = final_val2 + "_outer_try_continued";

} catch (e_outer_for_3) {
    $('log', `outer catch for err3: ${e_outer_for_3.message}`);
    final_val2 = "modified_by_outer_catch3";
}
$('log', `final_val after err3: ${final_val2}`);
`````


## Settled


`````js filename=intro
try {
  $(`log`, `throwing error 1`);
  try {
    const tmpThrowArg /*:object*/ /*truthy*/ = new Error(`Original Error 1`);
    throw tmpThrowArg;
  } catch (e) {
    const shouldRethrow /*:unknown*/ = $(`should_rethrow1`, true);
    const tmpBinBothRhs$2 /*:string*/ = $coerce(shouldRethrow, `string`);
    const tmpCalleeParam /*:string*/ /*truthy*/ = `caught error 1, rethrowing: ${tmpBinBothRhs$2}`;
    $(`log`, tmpCalleeParam);
    if (shouldRethrow) {
      throw e;
    } else {
    }
  }
} catch (outer_e) {
  const tmpBinBothRhs$4 /*:string*/ = $coerce(outer_e, `string`);
  const tmpCalleeParam$1 /*:string*/ /*truthy*/ = `caught outer: ${tmpBinBothRhs$4}`;
  $(`log`, tmpCalleeParam$1);
}
try {
  $(`log`, `throwing error 2`);
  const tmpThrowArg$1 /*:object*/ /*truthy*/ = new Error(`Original Error 2`);
  throw tmpThrowArg$1;
} catch (e$1) {
  const shouldRethrow$1 /*:unknown*/ = $(`should_rethrow2`, false);
  const tmpBinBothRhs$6 /*:string*/ = $coerce(shouldRethrow$1, `string`);
  const tmpCalleeParam$3 /*:string*/ /*truthy*/ = `caught error 2, rethrowing: ${tmpBinBothRhs$6}`;
  $(`log`, tmpCalleeParam$3);
  if (shouldRethrow$1) {
    throw e$1;
  } else {
  }
}
$(`log`, `final_val after err2: initial_val_modified_in_catch2`);
let final_val2 /*:string*/ /*truthy*/ = `modified_by_inner_catch3_outer_try_continued`;
try {
  $(`log`, `throwing error 3`);
  try {
    const tmpThrowArg$3 /*:object*/ /*truthy*/ = new Error(`Original Error 3`);
    throw tmpThrowArg$3;
  } catch (e_inner) {
    const rethrowDecision /*:unknown*/ = $(`rethrow_inner_3`, false);
    const tmpBinBothRhs$8 /*:string*/ = $coerce(rethrowDecision, `string`);
    const tmpCalleeParam$7 /*:string*/ /*truthy*/ = `caught error 3, rethrowing: ${tmpBinBothRhs$8}`;
    $(`log`, tmpCalleeParam$7);
    if (rethrowDecision) {
      throw e_inner;
    } else {
    }
  }
} catch (e_outer_for_3) {
  const tmpCalleeParam$11 /*:unknown*/ = e_outer_for_3.message;
  const tmpBinBothRhs$10 /*:string*/ = $coerce(tmpCalleeParam$11, `string`);
  const tmpCalleeParam$9 /*:string*/ /*truthy*/ = `outer catch for err3: ${tmpBinBothRhs$10}`;
  $(`log`, tmpCalleeParam$9);
  final_val2 = `modified_by_outer_catch3`;
}
const tmpCalleeParam$13 /*:string*/ /*truthy*/ = `final_val after err3: ${final_val2}`;
$(`log`, tmpCalleeParam$13);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(`log`, `throwing error 1`);
  try {
    const tmpThrowArg = new Error(`Original Error 1`);
    throw tmpThrowArg;
  } catch (e) {
    const shouldRethrow = $(`should_rethrow1`, true);
    $(`log`, `caught error 1, rethrowing: ${shouldRethrow}`);
    if (shouldRethrow) {
      throw e;
    }
  }
} catch (outer_e) {
  $(`log`, `caught outer: ${outer_e}`);
}
try {
  $(`log`, `throwing error 2`);
  const tmpThrowArg$1 = new Error(`Original Error 2`);
  throw tmpThrowArg$1;
} catch (e$1) {
  const shouldRethrow$1 = $(`should_rethrow2`, false);
  $(`log`, `caught error 2, rethrowing: ${shouldRethrow$1}`);
  if (shouldRethrow$1) {
    throw e$1;
  }
}
$(`log`, `final_val after err2: initial_val_modified_in_catch2`);
let final_val2 = `modified_by_inner_catch3_outer_try_continued`;
try {
  $(`log`, `throwing error 3`);
  try {
    const tmpThrowArg$3 = new Error(`Original Error 3`);
    throw tmpThrowArg$3;
  } catch (e_inner) {
    const rethrowDecision = $(`rethrow_inner_3`, false);
    $(`log`, `caught error 3, rethrowing: ${rethrowDecision}`);
    if (rethrowDecision) {
      throw e_inner;
    }
  }
} catch (e_outer_for_3) {
  $(`log`, `outer catch for err3: ${e_outer_for_3.message}`);
  final_val2 = `modified_by_outer_catch3`;
}
$(`log`, `final_val after err3: ${final_val2}`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( "log", "throwing error 1" );
  try {
    const a = new Error( "Original Error 1" );
    throw a;
  }
  catch (b) {
    const c = $( "should_rethrow1", true );
    const d = $coerce( c, "string" );
    const e = `caught error 1, rethrowing: ${d}`;
    $( "log", e );
    if (c) {
      throw b;
    }
  }
}
catch (f) {
  const g = $coerce( f, "string" );
  const h = `caught outer: ${g}`;
  $( "log", h );
}
try {
  $( "log", "throwing error 2" );
  const i = new Error( "Original Error 2" );
  throw i;
}
catch (j) {
  const k = $( "should_rethrow2", false );
  const l = $coerce( k, "string" );
  const m = `caught error 2, rethrowing: ${l}`;
  $( "log", m );
  if (k) {
    throw j;
  }
}
$( "log", "final_val after err2: initial_val_modified_in_catch2" );
let n = "modified_by_inner_catch3_outer_try_continued";
try {
  $( "log", "throwing error 3" );
  try {
    const o = new Error( "Original Error 3" );
    throw o;
  }
  catch (p) {
    const q = $( "rethrow_inner_3", false );
    const r = $coerce( q, "string" );
    const s = `caught error 3, rethrowing: ${r}`;
    $( "log", s );
    if (q) {
      throw p;
    }
  }
}
catch (t) {
  const u = t.message;
  const v = $coerce( u, "string" );
  const w = `outer catch for err3: ${v}`;
  $( "log", w );
  n = "modified_by_outer_catch3";
}
const x = `final_val after err3: ${n}`;
$( "log", x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let final_val = `initial_val`;
try {
  $(`log`, `throwing error 1`);
  try {
    const tmpThrowArg = new Error(`Original Error 1`);
    throw tmpThrowArg;
  } catch (e) {
    const shouldRethrow = $(`should_rethrow1`, true);
    const tmpBinBothLhs = `caught error 1, rethrowing: `;
    const tmpBinBothRhs = $coerce(shouldRethrow, `string`);
    const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
    let tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
    $(`log`, tmpCalleeParam);
    if (shouldRethrow) {
      throw e;
    } else {
      final_val = `initial_val_modified_in_catch1`;
    }
  }
} catch (outer_e) {
  const tmpBinBothLhs$1 = `caught outer: `;
  const tmpBinBothRhs$1 = $coerce(outer_e, `string`);
  const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  let tmpCalleeParam$1 = $coerce(tmpBinLhs$1, `plustr`);
  $(`log`, tmpCalleeParam$1);
}
try {
  $(`log`, `throwing error 2`);
  const tmpThrowArg$1 = new Error(`Original Error 2`);
  throw tmpThrowArg$1;
} catch (e$1) {
  const shouldRethrow$1 = $(`should_rethrow2`, false);
  const tmpBinBothLhs$3 = `caught error 2, rethrowing: `;
  const tmpBinBothRhs$3 = $coerce(shouldRethrow$1, `string`);
  const tmpBinLhs$3 = tmpBinBothLhs$3 + tmpBinBothRhs$3;
  let tmpCalleeParam$3 = $coerce(tmpBinLhs$3, `plustr`);
  $(`log`, tmpCalleeParam$3);
  if (shouldRethrow$1) {
    throw e$1;
  } else {
    final_val = `initial_val_modified_in_catch2`;
  }
}
const tmpBinBothLhs$5 = `final_val after err2: `;
const tmpBinBothRhs$5 = $coerce(final_val, `string`);
const tmpBinLhs$5 = tmpBinBothLhs$5 + tmpBinBothRhs$5;
let tmpCalleeParam$5 = $coerce(tmpBinLhs$5, `plustr`);
$(`log`, tmpCalleeParam$5);
let final_val2 = `initial_val_for_err3`;
try {
  $(`log`, `throwing error 3`);
  try {
    const tmpThrowArg$3 = new Error(`Original Error 3`);
    throw tmpThrowArg$3;
  } catch (e_inner) {
    const rethrowDecision = $(`rethrow_inner_3`, false);
    const tmpBinBothLhs$7 = `caught error 3, rethrowing: `;
    const tmpBinBothRhs$7 = $coerce(rethrowDecision, `string`);
    const tmpBinLhs$7 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
    let tmpCalleeParam$7 = $coerce(tmpBinLhs$7, `plustr`);
    $(`log`, tmpCalleeParam$7);
    if (rethrowDecision) {
      throw e_inner;
    } else {
      final_val2 = `modified_by_inner_catch3`;
    }
  }
  const tmpStringConcatR = $coerce(final_val2, `plustr`);
  final_val2 = `${tmpStringConcatR}_outer_try_continued`;
} catch (e_outer_for_3) {
  const tmpBinBothLhs$9 = `outer catch for err3: `;
  let tmpCalleeParam$11 = e_outer_for_3.message;
  const tmpBinBothRhs$9 = $coerce(tmpCalleeParam$11, `string`);
  const tmpBinLhs$9 = tmpBinBothLhs$9 + tmpBinBothRhs$9;
  let tmpCalleeParam$9 = $coerce(tmpBinLhs$9, `plustr`);
  $(`log`, tmpCalleeParam$9);
  final_val2 = `modified_by_outer_catch3`;
}
const tmpBinBothLhs$11 = `final_val after err3: `;
const tmpBinBothRhs$11 = $coerce(final_val2, `string`);
const tmpBinLhs$11 = tmpBinBothLhs$11 + tmpBinBothRhs$11;
let tmpCalleeParam$13 = $coerce(tmpBinLhs$11, `plustr`);
$(`log`, tmpCalleeParam$13);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) can try-escaping support this expr node type? NewExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'log', 'throwing error 1'
 - 2: 'should_rethrow1', true
 - 3: 'log', 'caught error 1, rethrowing: should_rethrow1'
 - 4: 'log', 'caught outer: Error: Original Error 1'
 - 5: 'log', 'throwing error 2'
 - 6: 'should_rethrow2', false
 - 7: 'log', 'caught error 2, rethrowing: should_rethrow2'
 - eval returned: ('<crash[ Original Error 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
