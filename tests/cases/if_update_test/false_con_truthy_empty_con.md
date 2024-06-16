# Preval test case

# false_con_truthy_empty_con.md

> If update test > False con truthy empty con
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
} else {
  $(3);
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
} else {
  $(3);
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
} else {
  $(3);
}
`````

## Output


`````js filename=intro
if ($) {
} else {
  $(3);
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {

}
else {
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
