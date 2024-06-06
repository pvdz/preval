# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $?.(1)); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = $?.(1))) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpIfTest$1 = tmpChainRootCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainRootCall(1);
    a = tmpChainElementCall;
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
const tmpIfTest$1 = $ == null;
if (tmpIfTest$1) {
  $(1);
} else {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
  if (tmpChainElementCall) {
    $(1);
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 = $ == null;
    if (tmpIfTest$2) {
      $(1);
    } else {
      const tmpChainElementCall$1 = $(1);
      a = tmpChainElementCall$1;
      if (tmpChainElementCall$1) {
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
const c = $ == null;
if (c) {
  $( 1 );
}
else {
  const d = $( 1 );
  a = d;
  if (d) {
    $( 1 );
  }
  else {
    b = false;
  }
}
if (b) {
  while ($LOOP_UNROLL_10) {
    const e = $ == null;
    if (e) {
      $( 1 );
    }
    else {
      const f = $( 1 );
      a = f;
      if (f) {
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
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
