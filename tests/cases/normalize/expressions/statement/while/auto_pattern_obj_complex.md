# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > While > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
while ($({ a: 1, b: 2 })) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
while ($({ a: 1, b: 2 })) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  const tmpIfTest = tmpCallCallee(tmpCalleeParam);
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
const tmpCalleeParam = { a: 1, b: 2 };
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpCalleeParam$1 = { a: 1, b: 2 };
    const tmpIfTest$1 = $(tmpCalleeParam$1);
    if (tmpIfTest$1) {
      $(100);
    } else {
      break;
    }
  }
} else {
}
$(999);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = {
a: 1,
b: 2
;
const c = $( b );
if (c) {
  $( 100 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const d = {
a: 1,
b: 2
    ;
    const e = $( d );
    if (e) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
$( 999 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 100
 - 3: { a: '1', b: '2' }
 - 4: 100
 - 5: { a: '1', b: '2' }
 - 6: 100
 - 7: { a: '1', b: '2' }
 - 8: 100
 - 9: { a: '1', b: '2' }
 - 10: 100
 - 11: { a: '1', b: '2' }
 - 12: 100
 - 13: { a: '1', b: '2' }
 - 14: 100
 - 15: { a: '1', b: '2' }
 - 16: 100
 - 17: { a: '1', b: '2' }
 - 18: 100
 - 19: { a: '1', b: '2' }
 - 20: 100
 - 21: { a: '1', b: '2' }
 - 22: 100
 - 23: { a: '1', b: '2' }
 - 24: 100
 - 25: { a: '1', b: '2' }
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
