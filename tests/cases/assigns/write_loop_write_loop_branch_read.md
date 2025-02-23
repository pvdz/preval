# Preval test case

# write_loop_write_loop_branch_read.md

> Assigns > Write loop write loop branch read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
let x = $(10);
while ($(x)) {
  x = $(0); // If this gets SSA'd then the loop won't stop
  if ($(true)) $(x, 'branch');
}
`````

## Pre Normal


`````js filename=intro
let x = $(10);
while ($(x)) {
  x = $(0);
  if ($(true)) $(x, `branch`);
}
`````

## Normalized


`````js filename=intro
let x = $(10);
while (true) {
  const tmpIfTest = $(x);
  if (tmpIfTest) {
    x = $(0);
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
      $(x, `branch`);
    } else {
    }
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(10);
const tmpIfTest /*:unknown*/ = $(x);
if (tmpIfTest) {
  let tmpClusterSSA_x /*:unknown*/ = $(0);
  const tmpIfTest$1 /*:unknown*/ = $(true);
  if (tmpIfTest$1) {
    $(tmpClusterSSA_x, `branch`);
  } else {
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(tmpClusterSSA_x);
    if (tmpIfTest$2) {
      tmpClusterSSA_x = $(0);
      const tmpIfTest$4 /*:unknown*/ = $(true);
      if (tmpIfTest$4) {
        $(tmpClusterSSA_x, `branch`);
      } else {
      }
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
const b = $( a );
if (b) {
  let c = $( 0 );
  const d = $( true );
  if (d) {
    $( c, "branch" );
  }
  while ($LOOP_UNROLL_10) {
    const e = $( c );
    if (e) {
      c = $( 0 );
      const f = $( true );
      if (f) {
        $( c, "branch" );
      }
    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - 3: 0
 - 4: true
 - 5: 0, 'branch'
 - 6: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
