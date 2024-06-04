# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident prop complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(b).c));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = $(b).c)) {
  } else {
    break;
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpAssignRhsProp = $(b);
  a = tmpAssignRhsProp.c;
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(100);
const b = { c: 1 };
const tmpAssignRhsProp = $(b);
let tmpSSA_a = tmpAssignRhsProp.c;
if (tmpSSA_a) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpAssignRhsProp$1 = $(b);
    tmpSSA_a = tmpAssignRhsProp$1.c;
    if (tmpSSA_a) {
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
$( 100 );
const b = { c: 1 };
const c = $( b );
let d = c.c;
if (d) {

}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = $( b );
    d = e.c;
    if (d) {

    }
    else {
      break;
    }
  }
}
$( d, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { c: '1' }
 - 3: 100
 - 4: { c: '1' }
 - 5: 100
 - 6: { c: '1' }
 - 7: 100
 - 8: { c: '1' }
 - 9: 100
 - 10: { c: '1' }
 - 11: 100
 - 12: { c: '1' }
 - 13: 100
 - 14: { c: '1' }
 - 15: 100
 - 16: { c: '1' }
 - 17: 100
 - 18: { c: '1' }
 - 19: 100
 - 20: { c: '1' }
 - 21: 100
 - 22: { c: '1' }
 - 23: 100
 - 24: { c: '1' }
 - 25: 100
 - 26: { c: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
