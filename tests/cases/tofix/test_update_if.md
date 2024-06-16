# Preval test case

# test_update_if.md

> Tofix > Test update if

We can trivially detect this case, and probably non-trivially detect more 
cases like it.

let x = true; if (y) x = false; if (x) z();
-> if (!y) z();

## Input

`````js filename=intro
let x = true;
if ($) {
  x = false;
} else { // $(3) goes in here
}
if (x) {
  $(3);
} else {
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
  $(3);
} else {
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
  $(3);
} else {
}
`````

## Output


`````js filename=intro
let x = true;
if ($) {
  x = false;
} else {
}
if (x) {
  $(3);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
if ($) {
  a = false;
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
