# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)?.(1) && $($)?.(1);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
  tmpIfTest = tmpChainElementCall$1;
}
if (tmpIfTest) {
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$2 = tmpChainRootCall$1($);
  const tmpIfTest$2 = tmpChainElementCall$2 != null;
  if (tmpIfTest$2) {
    const tmpChainElementCall$3 = tmpChainElementCall$2.call(tmpChainRootCall$1, 1);
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainElementCall = $($);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpChainElementCall$1 = tmpChainElementCall.call($, 1);
  tmpIfTest = tmpChainElementCall$1;
}
if (tmpIfTest) {
  const tmpChainElementCall$2 = $($);
  const tmpIfTest$2 = tmpChainElementCall$2 != null;
  if (tmpIfTest$2) {
    tmpChainElementCall$2.call($, 1);
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
