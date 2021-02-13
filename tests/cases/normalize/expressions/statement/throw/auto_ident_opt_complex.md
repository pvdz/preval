# Preval test case

# auto_ident_opt_complex.md

> normalize > expressions > statement > throw > auto_ident_opt_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
throw $(b)?.x;
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpThrowArg = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
if (tmpChainElementCall) {
  const tmpChainElementObject = tmpChainElementCall.x;
  tmpThrowArg = tmpChainElementObject;
}
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpThrowArg = undefined;
const tmpChainElementCall = $(b);
if (tmpChainElementCall) {
  const tmpChainElementObject = tmpChainElementCall.x;
  tmpThrowArg = tmpChainElementObject;
}
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same