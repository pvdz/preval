# Preval test case

# true_con_falsy_empty_con.md

> If update test > True con falsy empty con
>
> Fold up back-to-back Ifs when the first mutate the tests of the second

## Input

`````js filename=intro
let x = true;
if ($) {
  x = false;
} else {
}
if (x) {
} else {
  $(3);
}
`````

## Pre Normal


`````js filename=intro
let x = true;
if ($) {
  x = false;
} else {
}
if (x) {
} else {
  $(3);
}
`````

## Normalized


`````js filename=intro
let x = true;
if ($) {
  x = false;
} else {
}
if (x) {
} else {
  $(3);
}
`````

## Output


`````js filename=intro
if ($) {
  $(3);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( 3 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
