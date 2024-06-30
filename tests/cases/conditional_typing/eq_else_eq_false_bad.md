# Preval test case

# eq_else_eq_false_bad.md

> Conditional typing > Eq else eq false bad
>
> Assignment that cannot be observed should be dropped

There's two aspects here;
- We can know the assigned value is false
- The binding `x` is already false in the else branch so the assignment is redundant

## Input

`````js filename=intro
let a = $(67637)
let x = a === 67636;
if (x) {
} else {
  if ($) a = 67636
  x = a === 67636;
}
$(x)
`````

## Pre Normal


`````js filename=intro
let a = $(67637);
let x = a === 67636;
if (x) {
} else {
  if ($) a = 67636;
  x = a === 67636;
}
$(x);
`````

## Normalized


`````js filename=intro
let a = $(67637);
let x = a === 67636;
if (x) {
} else {
  if ($) {
    a = 67636;
  } else {
  }
  x = a === 67636;
}
$(x);
`````

## Output


`````js filename=intro
const a = $(67637);
const x = a === 67636;
if (x) {
  $(true);
} else {
  const tmpBool = Boolean($);
  $(tmpBool);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 67637 );
const b = a === 67636;
if (b) {
  $( true );
}
else {
  const c = Boolean( $ );
  $( c );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 67637
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
