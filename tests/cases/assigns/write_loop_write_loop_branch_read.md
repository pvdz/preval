# Preval test case

# write_loop_write_loop_branch_read.md

> Assigns > Write loop write loop branch read
>
> Turning a var into a const. Or not.

#TODO

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
let tmpIfTest = $(x);
while (true) {
  if (tmpIfTest) {
    x = $(0);
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
      $(x, `branch`);
    } else {
    }
    tmpIfTest = $(x);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
const x = $(10);
const tmpIfTest = $(x);
if (tmpIfTest) {
  const tmpClusterSSA_x = $(0);
  const tmpIfTest$1 = $(true);
  if (tmpIfTest$1) {
    $(tmpClusterSSA_x, `branch`);
  } else {
  }
  let tmpClusterSSA_tmpIfTest = $(tmpClusterSSA_x);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpClusterSSA_x$1 = $(0);
      const tmpIfTest$2 = $(true);
      if (tmpIfTest$2) {
        $(tmpClusterSSA_x$1, `branch`);
      } else {
      }
      tmpClusterSSA_tmpIfTest = $(tmpClusterSSA_x$1);
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
  const c = $( 0 );
  const d = $( true );
  if (d) {
    $( c, "branch" );
  }
  let e = $( c );
  while ($LOOP_UNROLL_10) {
    if (e) {
      const f = $( 0 );
      const g = $( true );
      if (g) {
        $( f, "branch" );
      }
      e = $( f );
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
