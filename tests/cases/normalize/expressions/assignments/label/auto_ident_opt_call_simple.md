# Preval test case

# auto_ident_opt_call_simple.md

> normalize > expressions > assignments > label > auto_ident_opt_call_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = $?.(1);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
label: {
  a = undefined;
  const tmpChainRootCall = $;
  if (tmpChainRootCall) {
    const tmpChainElementCall = tmpChainRootCall(1);
    a = tmpChainElementCall;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
label: {
  a = undefined;
  const tmpChainRootCall = $;
  if (tmpChainRootCall) {
    const tmpChainElementCall = tmpChainRootCall(1);
    a = tmpChainElementCall;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
