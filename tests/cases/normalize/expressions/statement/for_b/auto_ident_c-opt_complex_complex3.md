# Preval test case

# auto_ident_c-opt_complex_complex3.md

> Normalize > Expressions > Statement > For b > Auto ident c-opt complex complex3
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
while (true) {
  let maybegx = undefined;
  const f = $;
  const g = f(b);
  const same = g != null;
  if (same) {
    const x = $(`x`);
    const gx = g[x];
    maybegx = gx;
  } else {
  }
  if (maybegx) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
while (true) {
  let maybegx = undefined;
  const f = $;
  const g = f(b);
  const same = g != null;
  if (same) {
    const x = $(`x`);
    const gx = g[x];
    maybegx = gx;
  } else {
  }
  if (maybegx) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
while (true) {
  let maybegx = undefined;
  const f = $;
  const g = f(b);
  const same = g != null;
  if (same) {
    const x = $(`x`);
    const gx = g[x];
    maybegx = gx;
  } else {
  }
  if (maybegx) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const b = { x: 1 };
let $tmpLoopUnrollCheck = true;
const g = $(b);
const same = g == null;
if (same) {
  $(1);
} else {
  const x = $(`x`);
  const gx = g[x];
  if (gx) {
    $(1);
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const g$1 = $(b);
    const same$1 = g$1 == null;
    if (same$1) {
      $(1);
    } else {
      const x$1 = $(`x`);
      const gx$1 = g$1[x$1];
      if (gx$1) {
        $(1);
      } else {
        break;
      }
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = { x: 1 };
let c = true;
const d = $( b );
const e = d == null;
if (e) {
  $( 1 );
}
else {
  const f = $( "x" );
  const g = d[ f ];
  if (g) {
    $( 1 );
  }
  else {
    c = false;
  }
}
if (c) {
  while ($LOOP_UNROLL_10) {
    const h = $( b );
    const i = h == null;
    if (i) {
      $( 1 );
    }
    else {
      const j = $( "x" );
      const k = h[ j ];
      if (k) {
        $( 1 );
      }
      else {
        break;
      }
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 1
 - 4: { x: '1' }
 - 5: 'x'
 - 6: 1
 - 7: { x: '1' }
 - 8: 'x'
 - 9: 1
 - 10: { x: '1' }
 - 11: 'x'
 - 12: 1
 - 13: { x: '1' }
 - 14: 'x'
 - 15: 1
 - 16: { x: '1' }
 - 17: 'x'
 - 18: 1
 - 19: { x: '1' }
 - 20: 'x'
 - 21: 1
 - 22: { x: '1' }
 - 23: 'x'
 - 24: 1
 - 25: { x: '1' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
