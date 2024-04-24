# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = !$(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = !$(100);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpUnaryArg = $(100);
    const tmpNestedComplexRhs = !tmpUnaryArg;
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
const tmpUnaryArg = $(100);
const tmpNestedComplexRhs = !tmpUnaryArg;
let tmpSSA_a = tmpNestedComplexRhs;
let tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
let $tmpLoopUnrollCheck = true;
if (tmpUnaryArg) {
  $tmpLoopUnrollCheck = false;
} else {
  $(100);
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs$1 = !tmpUnaryArg$1;
  tmpSSA_a = tmpNestedComplexRhs$1;
  tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      const tmpUnaryArg$2 = $(100);
      const tmpNestedComplexRhs$2 = !tmpUnaryArg$2;
      tmpSSA_a = tmpNestedComplexRhs$2;
      tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = $( 100 );
const b = !a;
let c = b;
let d = b;
let e = true;
if (a) {
  e = false;
}
else {
  $( 100 );
  const f = $( 100 );
  const g = !f;
  c = g;
  d = g;
}
if (e) {
  while ($LOOP_UNROLL_9) {
    if (d) {
      $( 100 );
      const h = $( 100 );
      const i = !h;
      c = i;
      d = i;
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
 - 2: 100
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
