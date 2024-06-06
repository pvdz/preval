# Preval test case

# loop_with_prior_nested_loop_read_okay.md

> Ssa > Loop with prior nested loop read okay
>
> Assignments in loops won't easily be SSA'd

#TODO

## Input

`````js filename=intro
function f() {
  while (true) {
    let x = $(1);
    $(x); // This should not prevent the SSA of the inner loop
    while (true) {
      x = $(2);
      $(x);
    }
  }
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    let x = $(1);
    $(x);
    while (true) {
      x = $(2);
      $(x);
    }
  }
};
if ($) f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    let x = $(1);
    $(x);
    while (true) {
      x = $(2);
      $(x);
    }
  }
  return undefined;
};
if ($) {
  f();
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  while (true) {
    const x = $(1);
    $(x);
    const tmpClusterSSA_x = $(2);
    $(tmpClusterSSA_x);
    const tmpClusterSSA_x$1 = $(2);
    $(tmpClusterSSA_x$1);
    const tmpClusterSSA_x$2 = $(2);
    $(tmpClusterSSA_x$2);
    const tmpClusterSSA_x$3 = $(2);
    $(tmpClusterSSA_x$3);
    const tmpClusterSSA_x$4 = $(2);
    $(tmpClusterSSA_x$4);
    const tmpClusterSSA_x$5 = $(2);
    $(tmpClusterSSA_x$5);
    const tmpClusterSSA_x$6 = $(2);
    $(tmpClusterSSA_x$6);
    const tmpClusterSSA_x$7 = $(2);
    $(tmpClusterSSA_x$7);
    const tmpClusterSSA_x$8 = $(2);
    $(tmpClusterSSA_x$8);
    const tmpClusterSSA_x$9 = $(2);
    $(tmpClusterSSA_x$9);
    const tmpClusterSSA_x$10 = $(2);
    $(tmpClusterSSA_x$10);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const tmpClusterSSA_x$11 = $(2);
      $(tmpClusterSSA_x$11);
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  while (true) {
    const a = $( 1 );
    $( a );
    const b = $( 2 );
    $( b );
    const c = $( 2 );
    $( c );
    const d = $( 2 );
    $( d );
    const e = $( 2 );
    $( e );
    const f = $( 2 );
    $( f );
    const g = $( 2 );
    $( g );
    const h = $( 2 );
    $( h );
    const i = $( 2 );
    $( i );
    const j = $( 2 );
    $( j );
    const k = $( 2 );
    $( k );
    const l = $( 2 );
    $( l );
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const m = $( 2 );
      $( m );
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - 9: 2
 - 10: 2
 - 11: 2
 - 12: 2
 - 13: 2
 - 14: 2
 - 15: 2
 - 16: 2
 - 17: 2
 - 18: 2
 - 19: 2
 - 20: 2
 - 21: 2
 - 22: 2
 - 23: 2
 - 24: 2
 - 25: 2
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
