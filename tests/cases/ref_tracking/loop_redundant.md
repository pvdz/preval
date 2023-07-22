# Preval test case

# loop_redundant.md

> Ref tracking > Loop redundant
>
> Both strings should be replaced with an empty string (or a custom string indicating they can't be observed)

## Input

`````js filename=intro
if ($) {
  let a = "jhayon.vercel.app"; // never observed, overwritten inside the loop
  let b = "jhayon.vercel.app"; // never observed, overwritten in both branches in the loop
  let c = 1;
  const d = $( "x" );
  while ($LOOP_UNROLL_500) {
    a = d.slice(0);
    const e = a[ 0 ];
    const f = e === ".";
    if (f) {
      b = a.slice( 1 );
    }
    else {
      b = a;
    }
    const h = b.length;
    $(h)
    c = c + 1;
    if (c > 10) break;
  }
}
`````

## Pre Normal

`````js filename=intro
if ($) {
  let a = `jhayon.vercel.app`;
  let b = `jhayon.vercel.app`;
  let c = 1;
  const d = $(`x`);
  while ($LOOP_UNROLL_500) {
    a = d.slice(0);
    const e = a[0];
    const f = e === `.`;
    if (f) {
      b = a.slice(1);
    } else {
      b = a;
    }
    const h = b.length;
    $(h);
    c = c + 1;
    if (c > 10) break;
  }
}
`````

## Normalized

`````js filename=intro
if ($) {
  let a = `jhayon.vercel.app`;
  let b = `jhayon.vercel.app`;
  let c = 1;
  const d = $(`x`);
  while ($LOOP_UNROLL_500) {
    a = d.slice(0);
    const e = a[0];
    const f = e === `.`;
    if (f) {
      b = a.slice(1);
    } else {
      b = a;
    }
    const h = b.length;
    $(h);
    c = c + 1;
    const tmpIfTest = c > 10;
    if (tmpIfTest) {
      break;
    } else {
    }
  }
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  let a = `jhayon.vercel.app`;
  let b = `jhayon.vercel.app`;
  let c = 1;
  const d = $(`x`);
  while ($LOOP_UNROLL_500) {
    a = d.slice(0);
    const e = a[0];
    const f = e === `.`;
    if (f) {
      b = a.slice(1);
    } else {
      b = a;
    }
    const h = b.length;
    $(h);
    c = c + 1;
    const tmpIfTest = c > 10;
    if (tmpIfTest) {
      break;
    } else {
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  let a = "jhayon.vercel.app";
  let b = "jhayon.vercel.app";
  let c = 1;
  const d = $( "x" );
  while ($LOOP_UNROLL_500) {
    a = d.slice( 0 );
    const e = a[ 0 ];
    const f = e === ".";
    if (f) {
      b = a.slice( 1 );
    }
    else {
      b = a;
    }
    const g = b.length;
    $( g );
    c = c + 1;
    const h = c > 10;
    if (h) {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
