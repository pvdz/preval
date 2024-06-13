# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Statement > For b > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
for (; $(b)?.[$("x")]?.[$("y")]; $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
{
  while ($(b)?.[$(`x`)]?.[$(`y`)]) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject != null;
    if (tmpIfTest$3) {
      const tmpChainRootComputed$1 = $(`y`);
      const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
      tmpIfTest = tmpChainElementObject$1;
    } else {
    }
  } else {
  }
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
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
const a = { a: 999, b: 1000 };
let $tmpLoopUnrollCheck = true;
const tmpChainElementCall = $(b);
const tmpIfTest$1 = tmpChainElementCall == null;
if (tmpIfTest$1) {
  $(1);
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 = tmpChainElementObject == null;
  if (tmpIfTest$3) {
    $(1);
  } else {
    const tmpChainRootComputed$1 = $(`y`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    if (tmpChainElementObject$1) {
      $(1);
    } else {
      $tmpLoopUnrollCheck = false;
    }
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpChainElementCall$1 = $(b);
    const tmpIfTest$2 = tmpChainElementCall$1 == null;
    if (tmpIfTest$2) {
      $(1);
    } else {
      const tmpChainRootComputed$2 = $(`x`);
      const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
      const tmpIfTest$4 = tmpChainElementObject$2 == null;
      if (tmpIfTest$4) {
        $(1);
      } else {
        const tmpChainRootComputed$4 = $(`y`);
        const tmpChainElementObject$4 = tmpChainElementObject$2[tmpChainRootComputed$4];
        if (tmpChainElementObject$4) {
          $(1);
        } else {
          break;
        }
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
const a = { y: 1 };
const b = { x: a };
const c = {
  a: 999,
  b: 1000,
};
let d = true;
const e = $( b );
const f = e == null;
if (f) {
  $( 1 );
}
else {
  const g = $( "x" );
  const h = e[ g ];
  const i = h == null;
  if (i) {
    $( 1 );
  }
  else {
    const j = $( "y" );
    const k = h[ j ];
    if (k) {
      $( 1 );
    }
    else {
      d = false;
    }
  }
}
if (d) {
  while ($LOOP_UNROLL_10) {
    const l = $( b );
    const m = l == null;
    if (m) {
      $( 1 );
    }
    else {
      const n = $( "x" );
      const o = l[ n ];
      const p = o == null;
      if (p) {
        $( 1 );
      }
      else {
        const q = $( "y" );
        const r = o[ q ];
        if (r) {
          $( 1 );
        }
        else {
          break;
        }
      }
    }
  }
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 1
 - 5: { x: '{"y":"1"}' }
 - 6: 'x'
 - 7: 'y'
 - 8: 1
 - 9: { x: '{"y":"1"}' }
 - 10: 'x'
 - 11: 'y'
 - 12: 1
 - 13: { x: '{"y":"1"}' }
 - 14: 'x'
 - 15: 'y'
 - 16: 1
 - 17: { x: '{"y":"1"}' }
 - 18: 'x'
 - 19: 'y'
 - 20: 1
 - 21: { x: '{"y":"1"}' }
 - 22: 'x'
 - 23: 'y'
 - 24: 1
 - 25: { x: '{"y":"1"}' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
