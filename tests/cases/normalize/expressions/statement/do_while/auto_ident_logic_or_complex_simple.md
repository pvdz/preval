# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(0)) || 2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ($($(0)) || 2) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    tmpIfTest = 2;
    if (tmpIfTest) {
    } else {
      break;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
const tmpCalleeParam = $(0);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
$(100);
const tmpCalleeParam$1 = $(0);
let tmpIfTest$1 = $(tmpCalleeParam$1);
if (tmpIfTest$1) {
} else {
  tmpIfTest$1 = true;
}
$(100);
const tmpCalleeParam$2 = $(0);
let tmpIfTest$2 = $(tmpCalleeParam$2);
if (tmpIfTest$2) {
} else {
  tmpIfTest$2 = true;
}
$(100);
const tmpCalleeParam$3 = $(0);
let tmpIfTest$3 = $(tmpCalleeParam$3);
if (tmpIfTest$3) {
} else {
  tmpIfTest$3 = true;
}
$(100);
const tmpCalleeParam$4 = $(0);
let tmpIfTest$4 = $(tmpCalleeParam$4);
if (tmpIfTest$4) {
} else {
  tmpIfTest$4 = true;
}
$(100);
const tmpCalleeParam$5 = $(0);
let tmpIfTest$5 = $(tmpCalleeParam$5);
if (tmpIfTest$5) {
} else {
  tmpIfTest$5 = true;
}
$(100);
const tmpCalleeParam$6 = $(0);
let tmpIfTest$6 = $(tmpCalleeParam$6);
if (tmpIfTest$6) {
} else {
  tmpIfTest$6 = true;
}
$(100);
const tmpCalleeParam$7 = $(0);
let tmpIfTest$7 = $(tmpCalleeParam$7);
if (tmpIfTest$7) {
} else {
  tmpIfTest$7 = true;
}
$(100);
const tmpCalleeParam$8 = $(0);
let tmpIfTest$8 = $(tmpCalleeParam$8);
if (tmpIfTest$8) {
} else {
  tmpIfTest$8 = true;
}
$(100);
const tmpCalleeParam$9 = $(0);
let tmpIfTest$9 = $(tmpCalleeParam$9);
if (tmpIfTest$9) {
} else {
  tmpIfTest$9 = true;
}
$(100);
const tmpCalleeParam$10 = $(0);
let tmpIfTest$10 = $(tmpCalleeParam$10);
if (tmpIfTest$10) {
} else {
  tmpIfTest$10 = true;
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCalleeParam$11 = $(0);
  let tmpIfTest$11 = $(tmpCalleeParam$11);
  if (tmpIfTest$11) {
  } else {
    tmpIfTest$11 = true;
  }
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  b = true;
}
$( 100 );
const c = $( 0 );
let d = $( c );
if (d) {

}
else {
  d = true;
}
$( 100 );
const e = $( 0 );
let f = $( e );
if (f) {

}
else {
  f = true;
}
$( 100 );
const g = $( 0 );
let h = $( g );
if (h) {

}
else {
  h = true;
}
$( 100 );
const i = $( 0 );
let j = $( i );
if (j) {

}
else {
  j = true;
}
$( 100 );
const k = $( 0 );
let l = $( k );
if (l) {

}
else {
  l = true;
}
$( 100 );
const m = $( 0 );
let n = $( m );
if (n) {

}
else {
  n = true;
}
$( 100 );
const o = $( 0 );
let p = $( o );
if (p) {

}
else {
  p = true;
}
$( 100 );
const q = $( 0 );
let r = $( q );
if (r) {

}
else {
  r = true;
}
$( 100 );
const s = $( 0 );
let t = $( s );
if (t) {

}
else {
  t = true;
}
$( 100 );
const u = $( 0 );
let v = $( u );
if (v) {

}
else {
  v = true;
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const w = $( 0 );
  let x = $( w );
  if (x) {

  }
  else {
    x = true;
  }
}
const y = {
a: 999,
b: 1000
;
$( y );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 100
 - 5: 0
 - 6: 0
 - 7: 100
 - 8: 0
 - 9: 0
 - 10: 100
 - 11: 0
 - 12: 0
 - 13: 100
 - 14: 0
 - 15: 0
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 100
 - 20: 0
 - 21: 0
 - 22: 100
 - 23: 0
 - 24: 0
 - 25: 100
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
