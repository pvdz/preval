# Preval test case

# double.md

> Continue > Double
>
> Simple example

## Input

`````js filename=intro
while (true) {
  if ($(false)) {
    $('uhoh');
    continue;
  }
  if ($(false)) {
    $('neither');
    continue;
  }
  $('exit');
  break;
}
$('woohoo');

while (true) {
  let continued = false;
  if ($(false)) {
    $('uhoh');
  } else {
    continued = true;
  }
  if (!continued) {
    if ($(false)) {
      $('neither');
    } else {
      continued = true;
    }
  }
  if (!continued) {
    $('exit');
    break;
  }
}
$('woohoo');
`````


## Settled


`````js filename=intro
loopStop$1: {
  loopStop: {
    const tmpIfTest /*:unknown*/ = $(false);
    if (tmpIfTest) {
      $(`uhoh`);
    } else {
      const tmpIfTest$1 /*:unknown*/ = $(false);
      if (tmpIfTest$1) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    const tmpIfTest$2 /*:unknown*/ = $(false);
    if (tmpIfTest$2) {
      $(`uhoh`);
    } else {
      const tmpIfTest$4 /*:unknown*/ = $(false);
      if (tmpIfTest$4) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    const tmpIfTest$3 /*:unknown*/ = $(false);
    if (tmpIfTest$3) {
      $(`uhoh`);
    } else {
      const tmpIfTest$5 /*:unknown*/ = $(false);
      if (tmpIfTest$5) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    const tmpIfTest$6 /*:unknown*/ = $(false);
    if (tmpIfTest$6) {
      $(`uhoh`);
    } else {
      const tmpIfTest$8 /*:unknown*/ = $(false);
      if (tmpIfTest$8) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    const tmpIfTest$7 /*:unknown*/ = $(false);
    if (tmpIfTest$7) {
      $(`uhoh`);
    } else {
      const tmpIfTest$9 /*:unknown*/ = $(false);
      if (tmpIfTest$9) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    const tmpIfTest$10 /*:unknown*/ = $(false);
    if (tmpIfTest$10) {
      $(`uhoh`);
    } else {
      const tmpIfTest$12 /*:unknown*/ = $(false);
      if (tmpIfTest$12) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    const tmpIfTest$11 /*:unknown*/ = $(false);
    if (tmpIfTest$11) {
      $(`uhoh`);
    } else {
      const tmpIfTest$13 /*:unknown*/ = $(false);
      if (tmpIfTest$13) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    const tmpIfTest$14 /*:unknown*/ = $(false);
    if (tmpIfTest$14) {
      $(`uhoh`);
    } else {
      const tmpIfTest$16 /*:unknown*/ = $(false);
      if (tmpIfTest$16) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    const tmpIfTest$15 /*:unknown*/ = $(false);
    if (tmpIfTest$15) {
      $(`uhoh`);
    } else {
      const tmpIfTest$17 /*:unknown*/ = $(false);
      if (tmpIfTest$17) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    const tmpIfTest$18 /*:unknown*/ = $(false);
    if (tmpIfTest$18) {
      $(`uhoh`);
    } else {
      const tmpIfTest$20 /*:unknown*/ = $(false);
      if (tmpIfTest$20) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    const tmpIfTest$19 /*:unknown*/ = $(false);
    if (tmpIfTest$19) {
      $(`uhoh`);
    } else {
      const tmpIfTest$21 /*:unknown*/ = $(false);
      if (tmpIfTest$21) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const tmpIfTest$22 /*:unknown*/ = $(false);
      if (tmpIfTest$22) {
        $(`uhoh`);
      } else {
        const tmpIfTest$24 /*:unknown*/ = $(false);
        if (tmpIfTest$24) {
          $(`neither`);
        } else {
          $(`exit`);
          break;
        }
      }
    }
  }
  $(`woohoo`);
  const tmpIfTest$23 /*:unknown*/ = $(false);
  if (tmpIfTest$23) {
    $(`uhoh`);
    const tmpIfTest$25 /*:unknown*/ = $(false);
    if (tmpIfTest$25) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    } else {
    }
  } else {
  }
  const tmpIfTest$26 /*:unknown*/ = $(false);
  if (tmpIfTest$26) {
    $(`uhoh`);
    const tmpIfTest$28 /*:unknown*/ = $(false);
    if (tmpIfTest$28) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    } else {
    }
  } else {
  }
  const tmpIfTest$27 /*:unknown*/ = $(false);
  if (tmpIfTest$27) {
    $(`uhoh`);
    const tmpIfTest$29 /*:unknown*/ = $(false);
    if (tmpIfTest$29) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    } else {
    }
  } else {
  }
  const tmpIfTest$30 /*:unknown*/ = $(false);
  if (tmpIfTest$30) {
    $(`uhoh`);
    const tmpIfTest$32 /*:unknown*/ = $(false);
    if (tmpIfTest$32) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    } else {
    }
  } else {
  }
  const tmpIfTest$31 /*:unknown*/ = $(false);
  if (tmpIfTest$31) {
    $(`uhoh`);
    const tmpIfTest$33 /*:unknown*/ = $(false);
    if (tmpIfTest$33) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    } else {
    }
  } else {
  }
  const tmpIfTest$34 /*:unknown*/ = $(false);
  if (tmpIfTest$34) {
    $(`uhoh`);
    const tmpIfTest$36 /*:unknown*/ = $(false);
    if (tmpIfTest$36) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    } else {
    }
  } else {
  }
  const tmpIfTest$35 /*:unknown*/ = $(false);
  if (tmpIfTest$35) {
    $(`uhoh`);
    const tmpIfTest$37 /*:unknown*/ = $(false);
    if (tmpIfTest$37) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    } else {
    }
  } else {
  }
  const tmpIfTest$38 /*:unknown*/ = $(false);
  if (tmpIfTest$38) {
    $(`uhoh`);
    const tmpIfTest$40 /*:unknown*/ = $(false);
    if (tmpIfTest$40) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    } else {
    }
  } else {
  }
  const tmpIfTest$39 /*:unknown*/ = $(false);
  if (tmpIfTest$39) {
    $(`uhoh`);
    const tmpIfTest$41 /*:unknown*/ = $(false);
    if (tmpIfTest$41) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    } else {
    }
  } else {
  }
  const tmpIfTest$42 /*:unknown*/ = $(false);
  if (tmpIfTest$42) {
    $(`uhoh`);
    const tmpIfTest$44 /*:unknown*/ = $(false);
    if (tmpIfTest$44) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    } else {
    }
  } else {
  }
  const tmpIfTest$43 /*:unknown*/ = $(false);
  if (tmpIfTest$43) {
    $(`uhoh`);
    const tmpIfTest$45 /*:unknown*/ = $(false);
    if (tmpIfTest$45) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    } else {
    }
  } else {
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpIfTest$46 /*:unknown*/ = $(false);
    if (tmpIfTest$46) {
      $(`uhoh`);
      const tmpIfTest$48 /*:unknown*/ = $(false);
      if (tmpIfTest$48) {
        $(`neither`);
        $(`exit`);
        break;
      } else {
      }
    } else {
    }
  }
}
$(`woohoo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
loopStop$1: {
  loopStop: {
    if ($(false)) {
      $(`uhoh`);
    } else {
      if ($(false)) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    if ($(false)) {
      $(`uhoh`);
    } else {
      if ($(false)) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    if ($(false)) {
      $(`uhoh`);
    } else {
      if ($(false)) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    if ($(false)) {
      $(`uhoh`);
    } else {
      if ($(false)) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    if ($(false)) {
      $(`uhoh`);
    } else {
      if ($(false)) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    if ($(false)) {
      $(`uhoh`);
    } else {
      if ($(false)) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    if ($(false)) {
      $(`uhoh`);
    } else {
      if ($(false)) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    if ($(false)) {
      $(`uhoh`);
    } else {
      if ($(false)) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    if ($(false)) {
      $(`uhoh`);
    } else {
      if ($(false)) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    if ($(false)) {
      $(`uhoh`);
    } else {
      if ($(false)) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    if ($(false)) {
      $(`uhoh`);
    } else {
      if ($(false)) {
        $(`neither`);
      } else {
        $(`exit`);
        break loopStop;
      }
    }
    while (true) {
      if ($(false)) {
        $(`uhoh`);
      } else {
        if ($(false)) {
          $(`neither`);
        } else {
          $(`exit`);
          break;
        }
      }
    }
  }
  $(`woohoo`);
  if ($(false)) {
    $(`uhoh`);
    if ($(false)) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    }
  }
  if ($(false)) {
    $(`uhoh`);
    if ($(false)) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    }
  }
  if ($(false)) {
    $(`uhoh`);
    if ($(false)) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    }
  }
  if ($(false)) {
    $(`uhoh`);
    if ($(false)) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    }
  }
  if ($(false)) {
    $(`uhoh`);
    if ($(false)) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    }
  }
  if ($(false)) {
    $(`uhoh`);
    if ($(false)) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    }
  }
  if ($(false)) {
    $(`uhoh`);
    if ($(false)) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    }
  }
  if ($(false)) {
    $(`uhoh`);
    if ($(false)) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    }
  }
  if ($(false)) {
    $(`uhoh`);
    if ($(false)) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    }
  }
  if ($(false)) {
    $(`uhoh`);
    if ($(false)) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    }
  }
  if ($(false)) {
    $(`uhoh`);
    if ($(false)) {
      $(`neither`);
      $(`exit`);
      break loopStop$1;
    }
  }
  while (true) {
    if ($(false)) {
      $(`uhoh`);
      if ($(false)) {
        $(`neither`);
        $(`exit`);
        break;
      }
    }
  }
}
$(`woohoo`);
`````


## PST Settled
With rename=true

`````js filename=intro
loopStop$1: {
  loopStop: {
    const a = $( false );
    if (a) {
      $( "uhoh" );
    }
    else {
      const b = $( false );
      if (b) {
        $( "neither" );
      }
      else {
        $( "exit" );
        break loopStop;
      }
    }
    const c = $( false );
    if (c) {
      $( "uhoh" );
    }
    else {
      const d = $( false );
      if (d) {
        $( "neither" );
      }
      else {
        $( "exit" );
        break loopStop;
      }
    }
    const e = $( false );
    if (e) {
      $( "uhoh" );
    }
    else {
      const f = $( false );
      if (f) {
        $( "neither" );
      }
      else {
        $( "exit" );
        break loopStop;
      }
    }
    const g = $( false );
    if (g) {
      $( "uhoh" );
    }
    else {
      const h = $( false );
      if (h) {
        $( "neither" );
      }
      else {
        $( "exit" );
        break loopStop;
      }
    }
    const i = $( false );
    if (i) {
      $( "uhoh" );
    }
    else {
      const j = $( false );
      if (j) {
        $( "neither" );
      }
      else {
        $( "exit" );
        break loopStop;
      }
    }
    const k = $( false );
    if (k) {
      $( "uhoh" );
    }
    else {
      const l = $( false );
      if (l) {
        $( "neither" );
      }
      else {
        $( "exit" );
        break loopStop;
      }
    }
    const m = $( false );
    if (m) {
      $( "uhoh" );
    }
    else {
      const n = $( false );
      if (n) {
        $( "neither" );
      }
      else {
        $( "exit" );
        break loopStop;
      }
    }
    const o = $( false );
    if (o) {
      $( "uhoh" );
    }
    else {
      const p = $( false );
      if (p) {
        $( "neither" );
      }
      else {
        $( "exit" );
        break loopStop;
      }
    }
    const q = $( false );
    if (q) {
      $( "uhoh" );
    }
    else {
      const r = $( false );
      if (r) {
        $( "neither" );
      }
      else {
        $( "exit" );
        break loopStop;
      }
    }
    const s = $( false );
    if (s) {
      $( "uhoh" );
    }
    else {
      const t = $( false );
      if (t) {
        $( "neither" );
      }
      else {
        $( "exit" );
        break loopStop;
      }
    }
    const u = $( false );
    if (u) {
      $( "uhoh" );
    }
    else {
      const v = $( false );
      if (v) {
        $( "neither" );
      }
      else {
        $( "exit" );
        break loopStop;
      }
    }
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const w = $( false );
      if (w) {
        $( "uhoh" );
      }
      else {
        const x = $( false );
        if (x) {
          $( "neither" );
        }
        else {
          $( "exit" );
          break;
        }
      }
    }
  }
  $( "woohoo" );
  const y = $( false );
  if (y) {
    $( "uhoh" );
    const z = $( false );
    if (z) {
      $( "neither" );
      $( "exit" );
      break loopStop$1;
    }
  }
  const ba = $( false );
  if (ba) {
    $( "uhoh" );
    const bb = $( false );
    if (bb) {
      $( "neither" );
      $( "exit" );
      break loopStop$1;
    }
  }
  const bc = $( false );
  if (bc) {
    $( "uhoh" );
    const bd = $( false );
    if (bd) {
      $( "neither" );
      $( "exit" );
      break loopStop$1;
    }
  }
  const be = $( false );
  if (be) {
    $( "uhoh" );
    const bf = $( false );
    if (bf) {
      $( "neither" );
      $( "exit" );
      break loopStop$1;
    }
  }
  const bg = $( false );
  if (bg) {
    $( "uhoh" );
    const bh = $( false );
    if (bh) {
      $( "neither" );
      $( "exit" );
      break loopStop$1;
    }
  }
  const bi = $( false );
  if (bi) {
    $( "uhoh" );
    const bj = $( false );
    if (bj) {
      $( "neither" );
      $( "exit" );
      break loopStop$1;
    }
  }
  const bk = $( false );
  if (bk) {
    $( "uhoh" );
    const bl = $( false );
    if (bl) {
      $( "neither" );
      $( "exit" );
      break loopStop$1;
    }
  }
  const bm = $( false );
  if (bm) {
    $( "uhoh" );
    const bn = $( false );
    if (bn) {
      $( "neither" );
      $( "exit" );
      break loopStop$1;
    }
  }
  const bo = $( false );
  if (bo) {
    $( "uhoh" );
    const bp = $( false );
    if (bp) {
      $( "neither" );
      $( "exit" );
      break loopStop$1;
    }
  }
  const bq = $( false );
  if (bq) {
    $( "uhoh" );
    const br = $( false );
    if (br) {
      $( "neither" );
      $( "exit" );
      break loopStop$1;
    }
  }
  const bs = $( false );
  if (bs) {
    $( "uhoh" );
    const bt = $( false );
    if (bt) {
      $( "neither" );
      $( "exit" );
      break loopStop$1;
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const bu = $( false );
    if (bu) {
      $( "uhoh" );
      const bv = $( false );
      if (bv) {
        $( "neither" );
        $( "exit" );
        break;
      }
    }
  }
}
$( "woohoo" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: false
 - 3: 'exit'
 - 4: 'woohoo'
 - 5: false
 - 6: false
 - 7: false
 - 8: false
 - 9: false
 - 10: false
 - 11: false
 - 12: false
 - 13: false
 - 14: false
 - 15: false
 - 16: false
 - 17: false
 - 18: false
 - 19: false
 - 20: false
 - 21: false
 - 22: false
 - 23: false
 - 24: false
 - 25: false
 - 26: false
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
