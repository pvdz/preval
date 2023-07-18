# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident upd ip simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (b++);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = b++;
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpPostUpdArgIdent = b;
    b = b + 1;
    tmpDoWhileFlag = tmpPostUpdArgIdent;
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
let b = 12;
let tmpDoWhileFlag = true;
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
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
let a = 12;
let b = true;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (b) {
    $( 100 );
    const c = a;
    a = a + 1;
    b = c;
  }
  else {
    break;
  }
}
const d = {
a: 999,
b: 1000
;
$( d, a );
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
