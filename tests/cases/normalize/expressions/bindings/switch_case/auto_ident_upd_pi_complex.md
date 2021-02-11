# Preval test case

# auto_ident_upd_pi_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_upd_pi_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 };

    let a = ++$($(b)).x;
    $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let a;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      {
        b = { x: 1 };
        a = undefined;
        const tmpCallCallee = $;
        const tmpCalleeParam = $(b);
        const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
        const tmpBinLhs = tmpNestedAssignObj.x;
        const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
        tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
        a = tmpNestedPropCompoundComplexRhs;
        $(a, b);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 2, { x: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
