# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Statement > While > Auto ident unary excl complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while (!$(100)) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (!$(100)) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
let tmpIfTest = !tmpUnaryArg;
while (true) {
  if (tmpIfTest) {
    $(100);
    const tmpUnaryArg$1 = $(100);
    tmpIfTest = !tmpUnaryArg$1;
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(100);
let tmpIfTest = tmpUnaryArg;
let $tmpLoopUnrollCheck = true;
if (tmpUnaryArg) {
  $tmpLoopUnrollCheck = false;
} else {
  $(100);
  const tmpUnaryArg$1 = $(100);
  tmpIfTest = tmpUnaryArg$1;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      break;
    } else {
      $(100);
      const tmpUnaryArg$2 = $(100);
      tmpIfTest = tmpUnaryArg$2;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
let b = a;
let c = true;
if (a) {
  c = false;
}
else {
  $( 100 );
  const d = $( 100 );
  b = d;
}
if (c) {
  while ($LOOP_UNROLL_10) {
    if (b) {
      break;
    }
    else {
      $( 100 );
      const e = $( 100 );
      b = e;
    }
  }
}
const f = {
a: 999,
b: 1000
;
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
