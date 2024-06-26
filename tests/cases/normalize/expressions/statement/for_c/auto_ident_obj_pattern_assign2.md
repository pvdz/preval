# Preval test case

# auto_ident_obj_pattern_assign2.md

> Normalize > Expressions > Statement > For c > Auto ident obj pattern assign2
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let z = $(3);
while (true) {
  const test = $(z);
  if (test) {
    const p = $(3);
    const q = $(4);
    const obj = { x: p, y: q };
    x = obj.x;
    y = z;
    z = 0;
  } else {
    break;
  }
}
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let z = $(3);
while (true) {
  const test = $(z);
  if (test) {
    const p = $(3);
    const q = $(4);
    const obj = { x: p, y: q };
    x = obj.x;
    y = z;
    z = 0;
  } else {
    break;
  }
}
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let z = $(3);
while (true) {
  const test = $(z);
  if (test) {
    const p = $(3);
    const q = $(4);
    const obj = { x: p, y: q };
    x = obj.x;
    y = z;
    z = 0;
  } else {
    break;
  }
}
$(a, x, y);
`````

## Output


`````js filename=intro
let x = 1;
let y = 2;
const z = $(3);
const test = $(z);
if (test) {
  const p = $(3);
  $(4);
  x = p;
  y = z;
  while ($LOOP_UNROLL_10) {
    const test$1 = $(0);
    if (test$1) {
      const p$1 = $(3);
      $(4);
      x = p$1;
      y = 0;
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a, x, y);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = 2;
const c = $( 3 );
const d = $( c );
if (d) {
  const e = $( 3 );
  $( 4 );
  a = e;
  b = c;
  while ($LOOP_UNROLL_10) {
    const f = $( 0 );
    if (f) {
      const g = $( 3 );
      $( 4 );
      a = g;
      b = 0;
    }
    else {
      break;
    }
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h, a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 3
 - 3: 3
 - 4: 4
 - 5: 0
 - 6: { a: '999', b: '1000' }, 3, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
