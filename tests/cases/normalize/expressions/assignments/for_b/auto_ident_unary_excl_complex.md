# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = !$(100)); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = !$(100))) {
    $(1);
  }
}
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
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(100);
let a = !tmpUnaryArg;
if (tmpUnaryArg) {
} else {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpUnaryArg$1 = $(100);
    a = !tmpUnaryArg$1;
    if (a) {
    } else {
      break;
    }
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
let b = !a;
if (a) {

}
else {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const c = $( 100 );
    b = !c;
    if (b) {

    }
    else {
      break;
    }
  }
}
$( b );
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
