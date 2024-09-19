# Preval test case

# base_implicit.md

> If merging > Base implicit
>
> When back to back ifs test on the same constant, the ifs can be merged safely

## Input

`````js filename=intro
const x = !unknown;
if (x) $('a'); else $('b');
if (x) $('d'); else $('c');
`````

## Pre Normal


`````js filename=intro
const x = !unknown;
if (x) $(`a`);
else $(`b`);
if (x) $(`d`);
else $(`c`);
`````

## Normalized


`````js filename=intro
const x = !unknown;
if (x) {
  $(`a`);
} else {
  $(`b`);
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````

## Output


`````js filename=intro
const x /*:boolean*/ = !unknown;
if (x) {
  $(`a`);
  $(`d`);
} else {
  $(`b`);
  $(`c`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = !unknown;
if (a) {
  $( "a" );
  $( "d" );
}
else {
  $( "b" );
  $( "c" );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

unknown

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
