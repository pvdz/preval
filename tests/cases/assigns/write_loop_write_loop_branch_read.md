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
let x = $(10);
let tmpIfTest = $(x);
const $tmpLoopUnrollCheck = tmpIfTest;
if (tmpIfTest) {
  x = $(0);
  const tmpIfTest$1 = $(true);
  if (tmpIfTest$1) {
    $(x, `branch`);
  } else {
  }
  tmpIfTest = $(x);
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      x = $(0);
      const tmpIfTest$2 = $(true);
      if (tmpIfTest$2) {
        $(x, `branch`);
      } else {
      }
      tmpIfTest = $(x);
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
let a = $( 10 );
let b = $( a );
const c = b;
if (b) {
  a = $( 0 );
  const d = $( true );
  if (d) {
    $( a, "branch" );
  }
  b = $( a );
}
if (c) {
  while ($LOOP_UNROLL_10) {
    if (b) {
      a = $( 0 );
      const e = $( true );
      if (e) {
        $( a, "branch" );
      }
      b = $( a );
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
