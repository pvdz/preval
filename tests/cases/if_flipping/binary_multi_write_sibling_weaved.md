# Preval test case

# binary_multi_write_sibling_weaved.md

> If flipping > Binary multi write sibling weaved
>
> When the binding is used in multiple `if`s

## Input

`````js filename=intro
const a = $(1);
const b = $(2);
const c = $(3);
let y = a !== b;
if (y) {
  $('if1');
} else {
  y = a !== c;
}

if (y) {
  $('if2');
} else {
  $('else1');
}

//$(y, 'after');
`````

## Pre Normal


`````js filename=intro
const a = $(1);
const b = $(2);
const c = $(3);
let y = a !== b;
if (y) {
  $(`if1`);
} else {
  y = a !== c;
}
if (y) {
  $(`if2`);
} else {
  $(`else1`);
}
`````

## Normalized


`````js filename=intro
const a = $(1);
const b = $(2);
const c = $(3);
let y = a !== b;
if (y) {
  $(`if1`);
} else {
  y = a !== c;
}
if (y) {
  $(`if2`);
} else {
  $(`else1`);
}
`````

## Output


`````js filename=intro
const a = $(1);
const b = $(2);
const c = $(3);
let y = a === b;
if (y) {
  y = a === c;
} else {
  $(`if1`);
}
if (y) {
  $(`else1`);
} else {
  $(`if2`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( 3 );
let d = a === b;
if (d) {
  d = a === c;
}
else {
  $( "if1" );
}
if (d) {
  $( "else1" );
}
else {
  $( "if2" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 'if1'
 - 5: 'if2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
