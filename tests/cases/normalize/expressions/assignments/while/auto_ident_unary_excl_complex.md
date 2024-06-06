# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > While > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = !$(100))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = !$(100))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpUnaryArg = $(100);
  a = !tmpUnaryArg;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
const tmpUnaryArg = $(100);
let a = !tmpUnaryArg;
if (tmpUnaryArg) {
  $tmpLoopUnrollCheck = false;
} else {
  $(100);
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpUnaryArg$1 = $(100);
    a = !tmpUnaryArg$1;
    if (a) {
      $(100);
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = $( 100 );
let c = !b;
if (b) {
  a = false;
}
else {
  $( 100 );
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const d = $( 100 );
    c = !d;
    if (c) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
