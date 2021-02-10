# Preval test case

# computed_call.md

> normalize > optional > computed_call
>
> Computed member sets context so should be kept

#TODO

## Input

`````js filename=intro
const a = {
  x: function(...args){ $(args, this.y); },
  y: 100,
};
$(a)[$('x')]?.(1, 2, 3);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = function (...args) {
  const tmpCallCallee = $;
  const tmpCalleeParam = args;
  const tmpCompObj = this;
  const tmpCalleeParam$1 = tmpCompObj.y;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
};
const a = { x: tmpObjLitVal, y: 100 };
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpChainRootComputed = $('x');
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
if (tmpChainElementObject) {
  const tmpChainElementCall$1 = tmpChainElementObject.call(tmpChainElementCall, 1, 2, 3);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '"function"', y: '100' }
 - 2: 'x'
 - 3: [1, 2, 3], 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
