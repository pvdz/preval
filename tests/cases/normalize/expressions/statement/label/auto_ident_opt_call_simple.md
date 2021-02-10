# Preval test case

# auto_ident_opt_call_simple.md

> normalize > expressions > statement > label > auto_ident_opt_call_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: $?.(1);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
label: {
  const tmpChainRootCall = $;
  if (tmpChainRootCall) {
    const tmpChainElementCall = tmpChainRootCall(1);
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
