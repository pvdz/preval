# Preval test case

# base_false.md

> Static lets > Base false
>
> If the read of a value of a `let` binding can be determined then we should inline it.

## Input

`````js filename=intro
let x = 5;
$(x);
if ($(false)) {
  if ($) $('tmp');
  x = 10;
  $(x, 'a');
} else {
  x = 20;
  $(x, 'b'); // Note: $ gets invoked _after_ reading x so it should not block the inline
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = 5;
$(x);
if ($(false)) {
  if ($) $(`tmp`);
  x = 10;
  $(x, `a`);
} else {
  x = 20;
  $(x, `b`);
}
$(x);
`````

## Normalized


`````js filename=intro
let x = 5;
$(x);
const tmpIfTest = $(false);
if (tmpIfTest) {
  if ($) {
    $(`tmp`);
  } else {
  }
  x = 10;
  $(x, `a`);
} else {
  x = 20;
  $(x, `b`);
}
$(x);
`````

## Output


`````js filename=intro
let x /*:number*/ = 10;
$(5);
const tmpIfTest /*:unknown*/ = $(false);
if (tmpIfTest) {
  if ($) {
    $(`tmp`);
  } else {
  }
  $(10, `a`);
} else {
  x = 20;
  $(20, `b`);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 10;
$( 5 );
const b = $( false );
if (b) {
  if ($) {
    $( "tmp" );
  }
  $( 10, "a" );
}
else {
  a = 20;
  $( 20, "b" );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: false
 - 3: 20, 'b'
 - 4: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
