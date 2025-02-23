# Preval test case

# unary_multi_write_sibling_weaved.md

> If flipping > Unary multi write sibling weaved
>
> When the binding is used in multiple `if`s

## Input

`````js filename=intro
const a = $(1);
const b = $(2);
let y = !a;
if (y) { // This should become a, with the branches flipped
  $('if1');
} else {
  y = !b;
}

// This write gets SSA'd, flipped, and then eliminated
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
let y = !a;
if (y) {
  $(`if1`);
} else {
  y = !b;
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
let y = !a;
if (y) {
  $(`if1`);
} else {
  y = !b;
}
if (y) {
  $(`if2`);
} else {
  $(`else1`);
}
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = $(2);
let y /*:boolean*/ = true;
if (a) {
  y = !b;
} else {
  $(`if1`);
}
if (y) {
  $(`if2`);
} else {
  $(`else1`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
let c = true;
if (a) {
  c = !b;
}
else {
  $( "if1" );
}
if (c) {
  $( "if2" );
}
else {
  $( "else1" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'else1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
