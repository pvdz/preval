# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Statement > While > Auto ident unary excl complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

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
while (true) {
  const tmpIfTest = $(100);
  if (tmpIfTest) {
    break;
  } else {
    $(100);
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpIfTest$1 = $(100);
    if (tmpIfTest$1) {
      break;
    } else {
    }
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {

}
else {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const b = $( 100 );
    if (b) {
      break;
    }
  }
}
const c = {
  a: 999,
  b: 1000,
};
$( c );
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
