# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > For b > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; (a = (1, 2, $(b))?.x); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while ((a = (1, 2, $(b))?.x)) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootProp = $(b);
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
    a = tmpChainElementObject;
  } else {
  }
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
let a = undefined;
let $tmpLoopUnrollCheck = true;
const b = { x: 1 };
const tmpChainRootProp = $(b);
const tmpIfTest$1 = tmpChainRootProp == null;
if (tmpIfTest$1) {
  $(1);
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
  if (tmpChainElementObject) {
    $(1);
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpChainRootProp$1 = $(b);
    const tmpIfTest$2 = tmpChainRootProp$1 == null;
    if (tmpIfTest$2) {
      $(1);
    } else {
      const tmpChainElementObject$1 = tmpChainRootProp$1.x;
      a = tmpChainElementObject$1;
      if (tmpChainElementObject$1) {
        $(1);
      } else {
        break;
      }
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
let b = true;
const c = { x: 1 };
const d = $( c );
const e = d == null;
if (e) {
  $( 1 );
}
else {
  const f = d.x;
  a = f;
  if (f) {
    $( 1 );
  }
  else {
    b = false;
  }
}
if (b) {
  while ($LOOP_UNROLL_10) {
    const g = $( c );
    const h = g == null;
    if (h) {
      $( 1 );
    }
    else {
      const i = g.x;
      a = i;
      if (i) {
        $( 1 );
      }
      else {
        break;
      }
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: { x: '1' }
 - 4: 1
 - 5: { x: '1' }
 - 6: 1
 - 7: { x: '1' }
 - 8: 1
 - 9: { x: '1' }
 - 10: 1
 - 11: { x: '1' }
 - 12: 1
 - 13: { x: '1' }
 - 14: 1
 - 15: { x: '1' }
 - 16: 1
 - 17: { x: '1' }
 - 18: 1
 - 19: { x: '1' }
 - 20: 1
 - 21: { x: '1' }
 - 22: 1
 - 23: { x: '1' }
 - 24: 1
 - 25: { x: '1' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
