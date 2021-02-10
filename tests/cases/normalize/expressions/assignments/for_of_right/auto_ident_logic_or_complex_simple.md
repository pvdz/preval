# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > assignments > for_of_right > auto_ident_logic_or_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = $($(0)) || 2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  if (tmpNestedComplexRhs) {
  } else {
    tmpNestedComplexRhs = 2;
  }
  a = tmpNestedComplexRhs;
  tmpForOfDeclRhs = tmpNestedComplexRhs;
  let x;
  for (x of tmpForOfDeclRhs) {
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
 - 1: 0
 - 2: 0
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
