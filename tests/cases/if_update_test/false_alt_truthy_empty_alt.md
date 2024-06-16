# Preval test case

# false_alt_truthy_empty_alt.md

> If update test > False alt truthy empty alt
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
  $(3);
} else {
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
  $(3);
} else {
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
  $(3);
} else {
}
`````

## Output


`````js filename=intro
let x = false;
if ($) {
} else {
  x = true;
}
if (x) {
  $(3);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = false;
if ($) {

}
else {
  a = true;
}
if (a) {
  $( 3 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
