# Preval test case

# try.md

> Unroll loop with true > Try
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
  } catch (e) {
    $('error', e);
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
    $(`error`, e);
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
    $(`error`, e$1);
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
    $(`error`, e$2);
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
    $(`error`, e$3);
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
    $(`error`, e$4);
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
    $(`error`, e$5);
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
    $(`error`, e$6);
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
    $(`error`, e$7);
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
    $(`error`, e$8);
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
    $(`error`, e$9);
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
    $(`error`, e$10);
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
      $(`error`, e$11);
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
    $(`error`, e);
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
    $(`error`, e$1);
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
    $(`error`, e$2);
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
    $(`error`, e$3);
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
    $(`error`, e$4);
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
    $(`error`, e$5);
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
    $(`error`, e$6);
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
    $(`error`, e$7);
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
    $(`error`, e$8);
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
    $(`error`, e$9);
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
    $(`error`, e$10);
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
      $(`error`, e$11);
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
    $( "error", b );
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
    $( "error", d );
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
    $( "error", f );
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
    $( "error", h );
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
    $( "error", j );
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
    $( "error", l );
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
    $( "error", n );
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
    $( "error", p );
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
    $( "error", r );
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
    $( "error", t );
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
    $( "error", v );
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
      $( "error", x );
    }
  }
}
`````


## Todos triggered


None


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
