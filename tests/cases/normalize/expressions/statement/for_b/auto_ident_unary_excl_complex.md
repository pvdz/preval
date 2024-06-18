# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Statement > For b > Auto ident unary excl complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; !$(100); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (!$(100)) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
let tmpIfTest = !tmpUnaryArg;
while (true) {
  if (tmpIfTest) {
    $(1);
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
if (tmpUnaryArg) {
} else {
  $(1);
  const tmpUnaryArg$1 = $(100);
  let tmpClusterSSA_tmpIfTest = tmpUnaryArg$1;
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      break;
    } else {
      $(1);
      const tmpUnaryArg$2 = $(100);
      tmpClusterSSA_tmpIfTest = tmpUnaryArg$2;
    }
  }
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {

}
else {
  $( 1 );
  const b = $( 100 );
  let c = b;
  while ($LOOP_UNROLL_10) {
    if (c) {
      break;
    }
    else {
      $( 1 );
      const d = $( 100 );
      c = d;
    }
  }
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
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
