# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident prop complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b).c);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $(b).c;
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpAssignRhsProp = $(b);
    a = tmpAssignRhsProp.c;
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
let $tmpLoopUnrollCheck = true;
const b = { c: 1 };
if (tmpIfTest) {
  const tmpAssignRhsProp = $(b);
  a = tmpAssignRhsProp.c;
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpAssignRhsProp$1 = $(b);
      a = tmpAssignRhsProp$1.c;
      tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
let b = $( 1 );
let c = true;
const d = { c: 1 };
if (b) {
  const e = $( d );
  a = e.c;
  b = $( 1 );
}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_10) {
    if (b) {
      const f = $( d );
      a = f.c;
      b = $( 1 );
    }
    else {
      break;
    }
  }
}
$( a, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { c: '1' }
 - 3: 1
 - 4: { c: '1' }
 - 5: 1
 - 6: { c: '1' }
 - 7: 1
 - 8: { c: '1' }
 - 9: 1
 - 10: { c: '1' }
 - 11: 1
 - 12: { c: '1' }
 - 13: 1
 - 14: { c: '1' }
 - 15: 1
 - 16: { c: '1' }
 - 17: 1
 - 18: { c: '1' }
 - 19: 1
 - 20: { c: '1' }
 - 21: 1
 - 22: { c: '1' }
 - 23: 1
 - 24: { c: '1' }
 - 25: 1
 - 26: { c: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
