# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > For a > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (typeof $(x); $(0); );
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  typeof $(x);
  while ($(0)) {}
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(x);
let tmpIfTest = $(0);
while (true) {
  if (tmpIfTest) {
    tmpIfTest = $(0);
  } else {
    break;
  }
}
$(a, x);
`````

## Output

`````js filename=intro
$(1);
let tmpIfTest = $(0);
if (tmpIfTest) {
  tmpIfTest = $(0);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      tmpIfTest = $(0);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
let a = $( 0 );
if (a) {
  a = $( 0 );
  while ($LOOP_UNROLL_10) {
    if (a) {
      a = $( 0 );
    }
    else {
      break;
    }
  }
}
const b = {
a: 999,
b: 1000
;
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
