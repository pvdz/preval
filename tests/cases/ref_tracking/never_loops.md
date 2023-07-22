# Preval test case

# never_loops.md

> Ref tracking > Never loops
>
> A loop that never loops should not be a loop
> We can fix this when our loops are while(true) and they guarantee to break at the end of every branching path

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
    break;
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
    break;
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
    break;
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
    break;
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
    break;
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
