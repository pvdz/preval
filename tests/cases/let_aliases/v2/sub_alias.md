# Preval test case

# sub_alias.md

> Let aliases > V2 > Sub alias
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmp = $(100);
if (tmp) {
  b = $(2);
  const alias = b; // This is a redundant alias that we can eliminate
  a = b;
  $(alias);
} else {
  $(tmp);
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmp = $(100);
if (tmp) {
  b = $(2);
  const alias = b;
  a = b;
  $(alias);
} else {
  $(tmp);
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmp = $(100);
if (tmp) {
  b = $(2);
  const alias = b;
  a = b;
  $(alias);
} else {
  $(tmp);
}
$(a, b);
`````

## Output


`````js filename=intro
let b /*:unknown*/ = 1;
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmp /*:unknown*/ = $(100);
if (tmp) {
  b = $(2);
  a = b;
  $(b);
} else {
  $(tmp);
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = {
  a: 999,
  b: 1000,
};
const c = $( 100 );
if (c) {
  a = $( 2 );
  b = a;
  $( a );
}
else {
  $( c );
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: 2
 - 4: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
