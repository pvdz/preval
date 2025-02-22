# Preval test case

# false_con_truthy_empty_alt.md

> If update test > False con truthy empty alt
>
> Fold up back-to-back Ifs when the first mutate the tests of the second

## Input

`````js filename=intro
let x = false;
if ($) {
  x = true;
} else {
}
if (x) {
  $(3);
} else {
}
`````

## Pre Normal


`````js filename=intro
let x = false;
if ($) {
  x = true;
} else {
}
if (x) {
  $(3);
} else {
}
`````

## Normalized


`````js filename=intro
let x = false;
if ($) {
  x = true;
} else {
}
if (x) {
  $(3);
} else {
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
