# Preval test case

# inc_simplify.md

> Tofix > Inc simplify
>
> This case is from a regular loop with ++b condition.
> But the way we transform `a=++x` is `tmp=x; x=x+1; a=tmp`
> Post-update rules should be able to see that the temp assignment is
> not observable and collapse them.
> Alternatively, and we should probably do that too, we can optimize
> the transform by changing it to assign first update second.

## Input

`````js filename=intro
let tmpDoWhileFlag = true;
let b = 12;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpPostUpdArgIdent$1 = b;
    b = b + 1;
    tmpDoWhileFlag = tmpPostUpdArgIdent$1;
  } else {
    break;
  }
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## Pre Normal

`````js filename=intro
let tmpDoWhileFlag = true;
let b = 12;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpPostUpdArgIdent$1 = b;
    b = b + 1;
    tmpDoWhileFlag = tmpPostUpdArgIdent$1;
  } else {
    break;
  }
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## Normalized

`````js filename=intro
let tmpDoWhileFlag = true;
let b = 12;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpPostUpdArgIdent$1 = b;
    b = b + 1;
    tmpDoWhileFlag = tmpPostUpdArgIdent$1;
  } else {
    break;
  }
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = true;
let b = 12;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpPostUpdArgIdent$1 = b;
    b = b + 1;
    tmpDoWhileFlag = tmpPostUpdArgIdent$1;
  } else {
    break;
  }
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
let b = 12;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (a) {
    $( 100 );
    const c = b;
    b = b + 1;
    a = c;
  }
  else {
    break;
  }
}
const d = {
a: 999,
b: 1000
;
$( d, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: 100
 - 7: 100
 - 8: 100
 - 9: 100
 - 10: 100
 - 11: 100
 - 12: 100
 - 13: 100
 - 14: 100
 - 15: 100
 - 16: 100
 - 17: 100
 - 18: 100
 - 19: 100
 - 20: 100
 - 21: 100
 - 22: 100
 - 23: 100
 - 24: 100
 - 25: 100
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
