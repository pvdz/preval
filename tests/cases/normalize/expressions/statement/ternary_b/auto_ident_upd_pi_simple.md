# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > Ternary b > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(1) ? ++b : $(200);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(1) ? ++b : $(200);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  b = b + 1;
} else {
  $(200);
}
$(a, b);
`````

## Output


`````js filename=intro
let b = 1;
const tmpIfTest = $(1);
if (tmpIfTest) {
  b = 2;
} else {
  $(200);
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = $( 1 );
if (b) {
  a = 2;
}
else {
  $( 200 );
}
const c = {
a: 999,
b: 1000
;
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
