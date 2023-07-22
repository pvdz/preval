# Preval test case

# loop_boundary.md

> Ref tracking > Loop boundary
>
> If there was a reference after the loop, it must reflect the value of the binding
> after mutations inside the loop. So in that case we can't SSA inside the loop.
> If there aren't any after the loop, then we can only SSA if there were no reads
> before the write. But that gets complicated by conditional branching, like:
>     `let x = 5; while (true) { if (false) x = 6; else $(x); }`
> In this case we see the write-ref before the read-ref, but we obviously can't apply
> SSA inside the loop because it will fail hard. We need more solid write tracking
> for this. As such we currently can't reliably apply SSA cross-loop boundaries.

## Input

`````js filename=intro
let x = 5;
while (true) { 
  if ($(false)) x = 6;
  else $(x);
  if ($(true)) break;
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 5;
while (true) {
  if ($(false)) x = 6;
  else $(x);
  if ($(true)) break;
}
$(x);
`````

## Normalized

`````js filename=intro
let x = 5;
while (true) {
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    x = 6;
  } else {
    $(x);
  }
  const tmpIfTest$1 = $(true);
  if (tmpIfTest$1) {
    break;
  } else {
  }
}
$(x);
`````

## Output

`````js filename=intro
let x = 5;
let $tmpLoopUnrollCheck = true;
const tmpIfTest = $(false);
if (tmpIfTest) {
  x = 6;
} else {
  $(x);
}
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  $tmpLoopUnrollCheck = false;
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 = $(false);
    if (tmpIfTest$2) {
      x = 6;
    } else {
      $(x);
    }
    const tmpIfTest$4 = $(true);
    if (tmpIfTest$4) {
      break;
    } else {
    }
  }
} else {
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 5;
let b = true;
const c = $( false );
if (c) {
  a = 6;
}
else {
  $( a );
}
const d = $( true );
if (d) {
  b = false;
}
if (b) {
  while ($LOOP_UNROLL_10) {
    const e = $( false );
    if (e) {
      a = 6;
    }
    else {
      $( a );
    }
    const f = $( true );
    if (f) {
      break;
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: 5
 - 3: true
 - 4: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
