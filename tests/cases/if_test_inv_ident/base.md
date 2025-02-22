# Preval test case

# base.md

> If test inv ident > Base
>
> Doing an if-test on a value that was !-inverted means we can just invert
> the if-else and use the invert-arg for it instead.

## Input

`````js filename=intro
let b = true;
$(100);
const c = $(100);
let a = !c;
if (c) {
  b = false;
} else {
}
if (b) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const d = $(100);
    a = !d;                   // <--
    if (a) {                  // <--
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = true;
$(100);
const c = $(100);
let a = !c;
if (c) {
  b = false;
} else {
}
if (b) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const d = $(100);
    a = !d;
    if (a) {
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## Normalized


`````js filename=intro
let b = true;
$(100);
const c = $(100);
let a = !c;
if (c) {
  b = false;
} else {
}
if (b) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const d = $(100);
    a = !d;
    if (a) {
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## Output


`````js filename=intro
$(100);
const c = $(100);
let a /*:boolean*/ = !c;
if (c) {
} else {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const d = $(100);
    a = !d;
    if (d) {
      break;
    } else {
    }
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = $( 100 );
let b = !a;
if (a) {

}
else {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 100 );
    const c = $( 100 );
    b = !c;
    if (c) {
      break;
    }
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
