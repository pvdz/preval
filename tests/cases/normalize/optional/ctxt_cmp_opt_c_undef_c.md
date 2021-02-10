# Preval test case

# ctxt_opt_c_undef_c.md

> normalize > optional > ctxt_opt_c_undef_c
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = {b: {}};
$($(a)[$('b')][$('c')]?.(100));
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpChainRootComputed = $('b');
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
const tmpChainRootComputed$1 = $('c');
const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
if (tmpChainElementObject$1) {
  const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainElementObject, 100);
  tmpCalleeParam = tmpChainElementCall$1;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { b: '{}' }
 - 2: 'b'
 - 3: 'c'
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
