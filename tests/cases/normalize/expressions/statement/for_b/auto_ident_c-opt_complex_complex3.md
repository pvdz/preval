# Preval test case

# auto_ident_c-opt_complex_complex3.md

> Normalize > Expressions > Statement > For b > Auto ident c-opt complex complex3
>
> Normalization of all kinds of expressions should work the same no matter where they are

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
let maybegx /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const g /*:unknown*/ = $(b);
const same /*:boolean*/ = g == null;
if (same) {
} else {
  const x /*:unknown*/ = $(`x`);
  const gx /*:unknown*/ = g[x];
  maybegx = gx;
}
if (maybegx) {
  while ($LOOP_UNROLL_10) {
    $(1);
    let maybegx$1 /*:unknown*/ = undefined;
    const g$1 /*:unknown*/ = $(b);
    const same$1 /*:boolean*/ = g$1 == null;
    if (same$1) {
    } else {
      const x$1 /*:unknown*/ = $(`x`);
      const gx$1 /*:unknown*/ = g$1[x$1];
      maybegx$1 = gx$1;
    }
    if (maybegx$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = $( "x" );
  const f = c[ e ];
  a = f;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    let g = undefined;
    const h = $( b );
    const i = h == null;
    if (i) {

    }
    else {
      const j = $( "x" );
      const k = h[ j ];
      g = k;
    }
    if (g) {

    }
    else {
      break;
    }
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l );
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
