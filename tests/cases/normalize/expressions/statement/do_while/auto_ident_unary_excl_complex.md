# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident unary excl complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while (!$(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (!$(100)) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpIfTest = $(100);
  if (tmpIfTest) {
    break;
  } else {
  }
}
$(a);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(100);
const tmpIfTest = $(100);
if (tmpIfTest) {
  $tmpLoopUnrollCheck = false;
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpIfTest$1 = $(100);
    if (tmpIfTest$1) {
      break;
    } else {
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
let a = true;
$( 100 );
const b = $( 100 );
if (b) {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const c = $( 100 );
    if (c) {
      break;
    }
  }
}
const d = {
a: 999,
b: 1000
;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
