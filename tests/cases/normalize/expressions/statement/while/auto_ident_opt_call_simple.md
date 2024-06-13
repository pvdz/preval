# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > While > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($?.(1)) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ($?.(1)) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootCall = $;
  const tmpIfTest$1 = tmpChainRootCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainRootCall(1);
    tmpIfTest = tmpChainElementCall;
  } else {
  }
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
const tmpIfTest$1 = $ == null;
if (tmpIfTest$1) {
  $(100);
} else {
  const tmpChainElementCall = $(1);
  if (tmpChainElementCall) {
    $(100);
  } else {
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 = $ == null;
    if (tmpIfTest$2) {
      $(100);
    } else {
      const tmpChainElementCall$1 = $(1);
      if (tmpChainElementCall$1) {
        $(100);
      } else {
        break;
      }
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = $ == null;
if (b) {
  $( 100 );
}
else {
  const c = $( 1 );
  if (c) {
    $( 100 );
  }
  else {
    a = false;
  }
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const d = $ == null;
    if (d) {
      $( 100 );
    }
    else {
      const e = $( 1 );
      if (e) {
        $( 100 );
      }
      else {
        break;
      }
    }
  }
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
