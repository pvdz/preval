# Preval test case

# let_write_loop.md

> Ref tracking > Last write analysis > Let write loop
>
> The init to a should be replaced with undefined

## Input

`````js filename=intro
const useless = new $(1);
let simplifyMe = useless;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmp = $(1);
  simplifyMe = tmp;
  if (simplifyMe) {
    break;
  }
}
$(simplifyMe);
`````

## Pre Normal


`````js filename=intro
const useless = new $(1);
let simplifyMe = useless;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmp = $(1);
  simplifyMe = tmp;
  if (simplifyMe) {
    break;
  }
}
$(simplifyMe);
`````

## Normalized


`````js filename=intro
const useless = new $(1);
let simplifyMe = useless;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmp = $(1);
  simplifyMe = tmp;
  if (simplifyMe) {
    break;
  } else {
  }
}
$(simplifyMe);
`````

## Output


`````js filename=intro
const useless = new $(1);
let simplifyMe = useless;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmp = $(1);
  simplifyMe = tmp;
  if (tmp) {
    break;
  } else {
  }
}
$(simplifyMe);
`````

## PST Output

With rename=true

`````js filename=intro
const a = new $( 1 );
let b = a;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const c = $( 1 );
  b = c;
  if (c) {
    break;
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
