# Preval test case

# multi_if.md

> Eq bang > Multi if
>
> A comparison followed by a bang on the result which is then tested is redundant if the value is not used anywhere else.

Found in Tenko, inside _parseClassBody

## Input

`````js filename=intro
const a = $(1);
const b = $(2);
const same = a === b;
if (!same) $('a');
if (!same) $('b');
if (!same) $('c');
`````

## Pre Normal


`````js filename=intro
const a = $(1);
const b = $(2);
const same = a === b;
if (!same) $(`a`);
if (!same) $(`b`);
if (!same) $(`c`);
`````

## Normalized


`````js filename=intro
const a = $(1);
const b = $(2);
const same = a === b;
if (same) {
} else {
  $(`a`);
  if (same) {
  } else {
    $(`b`);
    if (same) {
    } else {
      $(`c`);
    }
  }
}
`````

## Output


`````js filename=intro
const a = $(1);
const b = $(2);
const same = a === b;
if (same) {
} else {
  $(`a`);
  $(`b`);
  $(`c`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a === b;
if (c) {

}
else {
  $( "a" );
  $( "b" );
  $( "c" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'a'
 - 4: 'b'
 - 5: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
