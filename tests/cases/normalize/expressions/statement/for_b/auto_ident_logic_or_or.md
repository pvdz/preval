# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > For b > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $($(0)) || $($(1)) || $($(2)); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($($(0)) || $($(1)) || $($(2))) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
    $(1);
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest) {
      $(1);
    } else {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpIfTest = tmpCallCallee$3(tmpCalleeParam$3);
      if (tmpIfTest) {
        $(1);
      } else {
        break;
      }
    }
  }
}
$(a);
`````

## Output


`````js filename=intro
loopStop$2: {
  const tmpCalleeParam = $(0);
  const tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    $(1);
  } else {
    const tmpCalleeParam$1 = $(1);
    const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest) {
      $(1);
    } else {
      const tmpCalleeParam$3 = $(2);
      const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$3);
      if (tmpClusterSSA_tmpIfTest$1) {
        $(1);
      } else {
        break loopStop$2;
      }
    }
  }
  const tmpCalleeParam$2 = $(0);
  const tmpIfTest$1 = $(tmpCalleeParam$2);
  if (tmpIfTest$1) {
    $(1);
  } else {
    const tmpCalleeParam$4 = $(1);
    const tmpClusterSSA_tmpIfTest$2 = $(tmpCalleeParam$4);
    if (tmpClusterSSA_tmpIfTest$2) {
      $(1);
    } else {
      const tmpCalleeParam$6 = $(2);
      const tmpClusterSSA_tmpIfTest$4 = $(tmpCalleeParam$6);
      if (tmpClusterSSA_tmpIfTest$4) {
        $(1);
      } else {
        break loopStop$2;
      }
    }
  }
  const tmpCalleeParam$5 = $(0);
  const tmpIfTest$2 = $(tmpCalleeParam$5);
  if (tmpIfTest$2) {
    $(1);
  } else {
    const tmpCalleeParam$7 = $(1);
    const tmpClusterSSA_tmpIfTest$3 = $(tmpCalleeParam$7);
    if (tmpClusterSSA_tmpIfTest$3) {
      $(1);
    } else {
      const tmpCalleeParam$9 = $(2);
      const tmpClusterSSA_tmpIfTest$5 = $(tmpCalleeParam$9);
      if (tmpClusterSSA_tmpIfTest$5) {
        $(1);
      } else {
        break loopStop$2;
      }
    }
  }
  const tmpCalleeParam$8 = $(0);
  const tmpIfTest$3 = $(tmpCalleeParam$8);
  if (tmpIfTest$3) {
    $(1);
  } else {
    const tmpCalleeParam$10 = $(1);
    const tmpClusterSSA_tmpIfTest$6 = $(tmpCalleeParam$10);
    if (tmpClusterSSA_tmpIfTest$6) {
      $(1);
    } else {
      const tmpCalleeParam$12 = $(2);
      const tmpClusterSSA_tmpIfTest$8 = $(tmpCalleeParam$12);
      if (tmpClusterSSA_tmpIfTest$8) {
        $(1);
      } else {
        break loopStop$2;
      }
    }
  }
  const tmpCalleeParam$11 = $(0);
  const tmpIfTest$4 = $(tmpCalleeParam$11);
  if (tmpIfTest$4) {
    $(1);
  } else {
    const tmpCalleeParam$13 = $(1);
    const tmpClusterSSA_tmpIfTest$7 = $(tmpCalleeParam$13);
    if (tmpClusterSSA_tmpIfTest$7) {
      $(1);
    } else {
      const tmpCalleeParam$15 = $(2);
      const tmpClusterSSA_tmpIfTest$9 = $(tmpCalleeParam$15);
      if (tmpClusterSSA_tmpIfTest$9) {
        $(1);
      } else {
        break loopStop$2;
      }
    }
  }
  const tmpCalleeParam$14 = $(0);
  const tmpIfTest$5 = $(tmpCalleeParam$14);
  if (tmpIfTest$5) {
    $(1);
  } else {
    const tmpCalleeParam$16 = $(1);
    const tmpClusterSSA_tmpIfTest$10 = $(tmpCalleeParam$16);
    if (tmpClusterSSA_tmpIfTest$10) {
      $(1);
    } else {
      const tmpCalleeParam$18 = $(2);
      const tmpClusterSSA_tmpIfTest$12 = $(tmpCalleeParam$18);
      if (tmpClusterSSA_tmpIfTest$12) {
        $(1);
      } else {
        break loopStop$2;
      }
    }
  }
  const tmpCalleeParam$17 = $(0);
  const tmpIfTest$6 = $(tmpCalleeParam$17);
  if (tmpIfTest$6) {
    $(1);
  } else {
    const tmpCalleeParam$19 = $(1);
    const tmpClusterSSA_tmpIfTest$11 = $(tmpCalleeParam$19);
    if (tmpClusterSSA_tmpIfTest$11) {
      $(1);
    } else {
      const tmpCalleeParam$21 = $(2);
      const tmpClusterSSA_tmpIfTest$13 = $(tmpCalleeParam$21);
      if (tmpClusterSSA_tmpIfTest$13) {
        $(1);
      } else {
        break loopStop$2;
      }
    }
  }
  const tmpCalleeParam$20 = $(0);
  const tmpIfTest$7 = $(tmpCalleeParam$20);
  if (tmpIfTest$7) {
    $(1);
  } else {
    const tmpCalleeParam$22 = $(1);
    const tmpClusterSSA_tmpIfTest$14 = $(tmpCalleeParam$22);
    if (tmpClusterSSA_tmpIfTest$14) {
      $(1);
    } else {
      const tmpCalleeParam$24 = $(2);
      const tmpClusterSSA_tmpIfTest$16 = $(tmpCalleeParam$24);
      if (tmpClusterSSA_tmpIfTest$16) {
        $(1);
      } else {
        break loopStop$2;
      }
    }
  }
  const tmpCalleeParam$23 = $(0);
  const tmpIfTest$8 = $(tmpCalleeParam$23);
  if (tmpIfTest$8) {
    $(1);
  } else {
    const tmpCalleeParam$25 = $(1);
    const tmpClusterSSA_tmpIfTest$15 = $(tmpCalleeParam$25);
    if (tmpClusterSSA_tmpIfTest$15) {
      $(1);
    } else {
      const tmpCalleeParam$27 = $(2);
      const tmpClusterSSA_tmpIfTest$17 = $(tmpCalleeParam$27);
      if (tmpClusterSSA_tmpIfTest$17) {
        $(1);
      } else {
        break loopStop$2;
      }
    }
  }
  const tmpCalleeParam$26 = $(0);
  const tmpIfTest$9 = $(tmpCalleeParam$26);
  if (tmpIfTest$9) {
    $(1);
  } else {
    const tmpCalleeParam$28 = $(1);
    const tmpClusterSSA_tmpIfTest$18 = $(tmpCalleeParam$28);
    if (tmpClusterSSA_tmpIfTest$18) {
      $(1);
    } else {
      const tmpCalleeParam$30 = $(2);
      const tmpClusterSSA_tmpIfTest$20 = $(tmpCalleeParam$30);
      if (tmpClusterSSA_tmpIfTest$20) {
        $(1);
      } else {
        break loopStop$2;
      }
    }
  }
  const tmpCalleeParam$29 = $(0);
  const tmpIfTest$10 = $(tmpCalleeParam$29);
  if (tmpIfTest$10) {
    $(1);
  } else {
    const tmpCalleeParam$31 = $(1);
    const tmpClusterSSA_tmpIfTest$19 = $(tmpCalleeParam$31);
    if (tmpClusterSSA_tmpIfTest$19) {
      $(1);
    } else {
      const tmpCalleeParam$33 = $(2);
      const tmpClusterSSA_tmpIfTest$21 = $(tmpCalleeParam$33);
      if (tmpClusterSSA_tmpIfTest$21) {
        $(1);
      } else {
        break loopStop$2;
      }
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpCalleeParam$32 = $(0);
    const tmpIfTest$11 = $(tmpCalleeParam$32);
    if (tmpIfTest$11) {
      $(1);
    } else {
      const tmpCalleeParam$34 = $(1);
      const tmpClusterSSA_tmpIfTest$22 = $(tmpCalleeParam$34);
      if (tmpClusterSSA_tmpIfTest$22) {
        $(1);
      } else {
        const tmpCalleeParam$36 = $(2);
        const tmpClusterSSA_tmpIfTest$24 = $(tmpCalleeParam$36);
        if (tmpClusterSSA_tmpIfTest$24) {
          $(1);
        } else {
          break;
        }
      }
    }
  }
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
loopStop$2: {
  const a = $( 0 );
  const b = $( a );
  if (b) {
    $( 1 );
  }
  else {
    const c = $( 1 );
    const d = $( c );
    if (d) {
      $( 1 );
    }
    else {
      const e = $( 2 );
      const f = $( e );
      if (f) {
        $( 1 );
      }
      else {
        break loopStop$2;
      }
    }
  }
  const g = $( 0 );
  const h = $( g );
  if (h) {
    $( 1 );
  }
  else {
    const i = $( 1 );
    const j = $( i );
    if (j) {
      $( 1 );
    }
    else {
      const k = $( 2 );
      const l = $( k );
      if (l) {
        $( 1 );
      }
      else {
        break loopStop$2;
      }
    }
  }
  const m = $( 0 );
  const n = $( m );
  if (n) {
    $( 1 );
  }
  else {
    const o = $( 1 );
    const p = $( o );
    if (p) {
      $( 1 );
    }
    else {
      const q = $( 2 );
      const r = $( q );
      if (r) {
        $( 1 );
      }
      else {
        break loopStop$2;
      }
    }
  }
  const s = $( 0 );
  const t = $( s );
  if (t) {
    $( 1 );
  }
  else {
    const u = $( 1 );
    const v = $( u );
    if (v) {
      $( 1 );
    }
    else {
      const w = $( 2 );
      const x = $( w );
      if (x) {
        $( 1 );
      }
      else {
        break loopStop$2;
      }
    }
  }
  const y = $( 0 );
  const z = $( y );
  if (z) {
    $( 1 );
  }
  else {
    const 01 = $( 1 );
    const 11 = $( 01 );
    if (11) {
      $( 1 );
    }
    else {
      const 21 = $( 2 );
      const 31 = $( 21 );
      if (31) {
        $( 1 );
      }
      else {
        break loopStop$2;
      }
    }
  }
  const 41 = $( 0 );
  const 51 = $( 41 );
  if (51) {
    $( 1 );
  }
  else {
    const 61 = $( 1 );
    const 71 = $( 61 );
    if (71) {
      $( 1 );
    }
    else {
      const 81 = $( 2 );
      const 91 = $( 81 );
      if (91) {
        $( 1 );
      }
      else {
        break loopStop$2;
      }
    }
  }
  const a1 = $( 0 );
  const b1 = $( a1 );
  if (b1) {
    $( 1 );
  }
  else {
    const c1 = $( 1 );
    const d1 = $( c1 );
    if (d1) {
      $( 1 );
    }
    else {
      const e1 = $( 2 );
      const f1 = $( e1 );
      if (f1) {
        $( 1 );
      }
      else {
        break loopStop$2;
      }
    }
  }
  const g1 = $( 0 );
  const h1 = $( g1 );
  if (h1) {
    $( 1 );
  }
  else {
    const i1 = $( 1 );
    const j1 = $( i1 );
    if (j1) {
      $( 1 );
    }
    else {
      const k1 = $( 2 );
      const l1 = $( k1 );
      if (l1) {
        $( 1 );
      }
      else {
        break loopStop$2;
      }
    }
  }
  const m1 = $( 0 );
  const n1 = $( m1 );
  if (n1) {
    $( 1 );
  }
  else {
    const o1 = $( 1 );
    const p1 = $( o1 );
    if (p1) {
      $( 1 );
    }
    else {
      const q1 = $( 2 );
      const r1 = $( q1 );
      if (r1) {
        $( 1 );
      }
      else {
        break loopStop$2;
      }
    }
  }
  const s1 = $( 0 );
  const t1 = $( s1 );
  if (t1) {
    $( 1 );
  }
  else {
    const u1 = $( 1 );
    const v1 = $( u1 );
    if (v1) {
      $( 1 );
    }
    else {
      const w1 = $( 2 );
      const x1 = $( w1 );
      if (x1) {
        $( 1 );
      }
      else {
        break loopStop$2;
      }
    }
  }
  const y1 = $( 0 );
  const z1 = $( y1 );
  if (z1) {
    $( 1 );
  }
  else {
    const 02 = $( 1 );
    const 12 = $( 02 );
    if (12) {
      $( 1 );
    }
    else {
      const 22 = $( 2 );
      const 32 = $( 22 );
      if (32) {
        $( 1 );
      }
      else {
        break loopStop$2;
      }
    }
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const 42 = $( 0 );
    const 52 = $( 42 );
    if (52) {
      $( 1 );
    }
    else {
      const 62 = $( 1 );
      const 72 = $( 62 );
      if (72) {
        $( 1 );
      }
      else {
        const 82 = $( 2 );
        const 92 = $( 82 );
        if (92) {
          $( 1 );
        }
        else {
          break;
        }
      }
    }
  }
}
const a2 = {
  a: 999,
  b: 1000,
};
$( a2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 0
 - 7: 0
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 0
 - 12: 0
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 0
 - 22: 0
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
