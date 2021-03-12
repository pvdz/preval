# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > For c > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); $($)?.(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $($)?.(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall($);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
    }
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpChainElementCall = $($);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      tmpChainElementCall.call($, 1);
    }
  } else {
    break;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: '<$>'
 - 6: 1
 - 7: 1
 - 8: '<$>'
 - 9: 1
 - 10: 1
 - 11: '<$>'
 - 12: 1
 - 13: 1
 - 14: '<$>'
 - 15: 1
 - 16: 1
 - 17: '<$>'
 - 18: 1
 - 19: 1
 - 20: '<$>'
 - 21: 1
 - 22: 1
 - 23: '<$>'
 - 24: 1
 - 25: 1
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
