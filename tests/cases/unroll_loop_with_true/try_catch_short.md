# Preval test case

# try_catch_short.md

> Unroll loop with true > Try catch short
>
> Trying to unroll a while loop with `true` as condition.

## Input

`````js filename=intro
while (true) {
  try {
    const test = $('first');
    $('second');
    if (test) {
      break;
    } else {
      $('third');
    }
  } catch {
    $('error');
  }
}
`````


## Settled


`````js filename=intro
loopStop: {
  try {
    const test /*:unknown*/ = $(`first`);
    $(`second`);
    if (test) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e) {
    $(`error`);
  }
  try {
    const test$1 /*:unknown*/ = $(`first`);
    $(`second`);
    if (test$1) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$1) {
    $(`error`);
  }
  try {
    const test$2 /*:unknown*/ = $(`first`);
    $(`second`);
    if (test$2) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$2) {
    $(`error`);
  }
  try {
    const test$3 /*:unknown*/ = $(`first`);
    $(`second`);
    if (test$3) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$3) {
    $(`error`);
  }
  try {
    const test$4 /*:unknown*/ = $(`first`);
    $(`second`);
    if (test$4) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$4) {
    $(`error`);
  }
  try {
    const test$5 /*:unknown*/ = $(`first`);
    $(`second`);
    if (test$5) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$5) {
    $(`error`);
  }
  try {
    const test$6 /*:unknown*/ = $(`first`);
    $(`second`);
    if (test$6) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$6) {
    $(`error`);
  }
  try {
    const test$7 /*:unknown*/ = $(`first`);
    $(`second`);
    if (test$7) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$7) {
    $(`error`);
  }
  try {
    const test$8 /*:unknown*/ = $(`first`);
    $(`second`);
    if (test$8) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$8) {
    $(`error`);
  }
  try {
    const test$9 /*:unknown*/ = $(`first`);
    $(`second`);
    if (test$9) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$9) {
    $(`error`);
  }
  try {
    const test$10 /*:unknown*/ = $(`first`);
    $(`second`);
    if (test$10) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$10) {
    $(`error`);
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    try {
      const test$11 /*:unknown*/ = $(`first`);
      $(`second`);
      if (test$11) {
        break;
      } else {
        $(`third`);
      }
    } catch (e$11) {
      $(`error`);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
loopStop: {
  try {
    const test = $(`first`);
    $(`second`);
    if (test) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e) {
    $(`error`);
  }
  try {
    const test$1 = $(`first`);
    $(`second`);
    if (test$1) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$1) {
    $(`error`);
  }
  try {
    const test$2 = $(`first`);
    $(`second`);
    if (test$2) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$2) {
    $(`error`);
  }
  try {
    const test$3 = $(`first`);
    $(`second`);
    if (test$3) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$3) {
    $(`error`);
  }
  try {
    const test$4 = $(`first`);
    $(`second`);
    if (test$4) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$4) {
    $(`error`);
  }
  try {
    const test$5 = $(`first`);
    $(`second`);
    if (test$5) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$5) {
    $(`error`);
  }
  try {
    const test$6 = $(`first`);
    $(`second`);
    if (test$6) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$6) {
    $(`error`);
  }
  try {
    const test$7 = $(`first`);
    $(`second`);
    if (test$7) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$7) {
    $(`error`);
  }
  try {
    const test$8 = $(`first`);
    $(`second`);
    if (test$8) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$8) {
    $(`error`);
  }
  try {
    const test$9 = $(`first`);
    $(`second`);
    if (test$9) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$9) {
    $(`error`);
  }
  try {
    const test$10 = $(`first`);
    $(`second`);
    if (test$10) {
      break loopStop;
    } else {
      $(`third`);
    }
  } catch (e$10) {
    $(`error`);
  }
  while (true) {
    try {
      const test$11 = $(`first`);
      $(`second`);
      if (test$11) {
        break;
      } else {
        $(`third`);
      }
    } catch (e$11) {
      $(`error`);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
loopStop: {
  try {
    const a = $( "first" );
    $( "second" );
    if (a) {
      break loopStop;
    }
    else {
      $( "third" );
    }
  }
  catch (b) {
    $( "error" );
  }
  try {
    const c = $( "first" );
    $( "second" );
    if (c) {
      break loopStop;
    }
    else {
      $( "third" );
    }
  }
  catch (d) {
    $( "error" );
  }
  try {
    const e = $( "first" );
    $( "second" );
    if (e) {
      break loopStop;
    }
    else {
      $( "third" );
    }
  }
  catch (f) {
    $( "error" );
  }
  try {
    const g = $( "first" );
    $( "second" );
    if (g) {
      break loopStop;
    }
    else {
      $( "third" );
    }
  }
  catch (h) {
    $( "error" );
  }
  try {
    const i = $( "first" );
    $( "second" );
    if (i) {
      break loopStop;
    }
    else {
      $( "third" );
    }
  }
  catch (j) {
    $( "error" );
  }
  try {
    const k = $( "first" );
    $( "second" );
    if (k) {
      break loopStop;
    }
    else {
      $( "third" );
    }
  }
  catch (l) {
    $( "error" );
  }
  try {
    const m = $( "first" );
    $( "second" );
    if (m) {
      break loopStop;
    }
    else {
      $( "third" );
    }
  }
  catch (n) {
    $( "error" );
  }
  try {
    const o = $( "first" );
    $( "second" );
    if (o) {
      break loopStop;
    }
    else {
      $( "third" );
    }
  }
  catch (p) {
    $( "error" );
  }
  try {
    const q = $( "first" );
    $( "second" );
    if (q) {
      break loopStop;
    }
    else {
      $( "third" );
    }
  }
  catch (r) {
    $( "error" );
  }
  try {
    const s = $( "first" );
    $( "second" );
    if (s) {
      break loopStop;
    }
    else {
      $( "third" );
    }
  }
  catch (t) {
    $( "error" );
  }
  try {
    const u = $( "first" );
    $( "second" );
    if (u) {
      break loopStop;
    }
    else {
      $( "third" );
    }
  }
  catch (v) {
    $( "error" );
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    try {
      const w = $( "first" );
      $( "second" );
      if (w) {
        break;
      }
      else {
        $( "third" );
      }
    }
    catch (x) {
      $( "error" );
    }
  }
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'first'
 - 2: 'second'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
