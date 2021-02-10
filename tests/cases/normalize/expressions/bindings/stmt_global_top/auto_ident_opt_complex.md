# Preval test case

# auto_ident_opt_complex.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_opt_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = $(b)?.x;
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
if (tmpChainElementCall) {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
