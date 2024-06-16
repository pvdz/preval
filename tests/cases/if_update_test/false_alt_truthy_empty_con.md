# Preval test case

# false_alt_truthy_empty_con.md

> If update test > False alt truthy empty con
>
> Fold up back-to-back Ifs when the first mutate the tests of the second

## Input

`````js filename=intro
let x = false;
if ($) {
} else {
  x = true;
}
if (x) {
} else {
  $(3);
}
`````

## Pre Normal


`````js filename=intro
let x = false;
if ($) {
} else {
  x = true;
}
if (x) {
} else {
  $(3);
}
`````

## Normalized


`````js filename=intro
let x = false;
if ($) {
} else {
  x = true;
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
