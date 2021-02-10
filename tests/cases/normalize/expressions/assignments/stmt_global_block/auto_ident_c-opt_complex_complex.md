# Preval test case

# auto_ident_c-opt_complex_complex.md

> normalize > expressions > assignments > stmt_global_block > auto_ident_c-opt_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { x: 1 };

  let a = { a: 999, b: 1000 };
  a = $(b)?.[$("x")];
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  if (tmpChainElementCall) {
    const tmpChainRootComputed = $('x');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    a = tmpChainElementObject;
  }
  $(a);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
