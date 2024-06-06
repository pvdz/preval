# Preval test case

# regression.md

> Redundant writes > Regression
>
> Regression causing $(3) to transform before $(1)
> The transform was pretty botched.

#TODO

## Input

`````js filename=intro
let cTmp = $(1);
let n = 1;
$(3);
while ($LOOP_UNROLL_10) {
  n = n + 1;
  const tmpIfTest$1 = n < 2;
  if (tmpIfTest$1) {
    $(3);
  } else {
    cTmp = `pass`;
    break;
  }
}
$(cTmp);
`````

## Pre Normal


`````js filename=intro
let cTmp = $(1);
let n = 1;
$(3);
while ($LOOP_UNROLL_10) {
  n = n + 1;
  const tmpIfTest$1 = n < 2;
  if (tmpIfTest$1) {
    $(3);
  } else {
    cTmp = `pass`;
    break;
  }
}
$(cTmp);
`````

## Normalized


`````js filename=intro
let cTmp = $(1);
let n = 1;
$(3);
while ($LOOP_UNROLL_10) {
  n = n + 1;
  const tmpIfTest$1 = n < 2;
  if (tmpIfTest$1) {
    $(3);
  } else {
    cTmp = `pass`;
    break;
  }
}
$(cTmp);
`````

## Output


`````js filename=intro
$(1);
$(3);
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 3 );
$( "pass" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
