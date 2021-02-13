# Preval test case

# ctxt_opt_abc_undef_b.md

> normalize > optional > ctxt_opt_abc_undef_b
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = {};
$($(a)?.[$('b')]?.[$('c')]?.(100));
`````

## Normalized

`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $('b');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = $('c');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpIfTest$2 = tmpChainElementObject$1 != null;
    if (tmpIfTest$2) {
      const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainElementObject, 100);
      tmpCalleeParam = tmpChainElementCall$1;
    }
  }
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a = {};
let tmpCalleeParam = undefined;
const tmpChainElementCall = $(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $('b');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = $('c');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpIfTest$2 = tmpChainElementObject$1 != null;
    if (tmpIfTest$2) {
      const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainElementObject, 100);
      tmpCalleeParam = tmpChainElementCall$1;
    }
  }
}
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: {}
 - 2: 'b'
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
