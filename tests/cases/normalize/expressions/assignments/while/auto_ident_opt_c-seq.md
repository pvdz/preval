# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > While > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while ((a = (1, 2, $(b))?.x)) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while ((a = (1, 2, $(b))?.x)) $(100);
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
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a = undefined;
const b = { x: 1 };
const tmpChainRootProp = $(b);
const tmpIfTest$1 = tmpChainRootProp == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
}
if (a) {
  $(100);
  while ($LOOP_UNROLL_10) {
    const tmpChainRootProp$1 = $(b);
    const tmpIfTest$2 = tmpChainRootProp$1 == null;
    if (tmpIfTest$2) {
    } else {
      const tmpChainElementObject$1 = tmpChainRootProp$1.x;
      a = tmpChainElementObject$1;
    }
    if (a) {
      $(100);
    } else {
      break;
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
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = c.x;
  a = e;
}
if (a) {
  $( 100 );
  while ($LOOP_UNROLL_10) {
    const f = $( b );
    const g = f == null;
    if (g) {

    }
    else {
      const h = f.x;
      a = h;
    }
    if (a) {
      $( 100 );
    }
    else {
      break;
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
 - 2: 100
 - 3: { x: '1' }
 - 4: 100
 - 5: { x: '1' }
 - 6: 100
 - 7: { x: '1' }
 - 8: 100
 - 9: { x: '1' }
 - 10: 100
 - 11: { x: '1' }
 - 12: 100
 - 13: { x: '1' }
 - 14: 100
 - 15: { x: '1' }
 - 16: 100
 - 17: { x: '1' }
 - 18: 100
 - 19: { x: '1' }
 - 20: 100
 - 21: { x: '1' }
 - 22: 100
 - 23: { x: '1' }
 - 24: 100
 - 25: { x: '1' }
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
