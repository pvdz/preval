# Preval test case

# auto_ident_upd_pi_complex.md

> normalize > expressions > statement > for_of_right > auto_ident_upd_pi_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (let x of ++$($(b)).x);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  tmpForOfDeclRhs = tmpNestedPropCompoundComplexRhs;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
