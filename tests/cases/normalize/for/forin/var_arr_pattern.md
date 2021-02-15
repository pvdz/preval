# Preval test case

# simple_complex.md

> normalize > for > forin > simple_complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
for (let {x} in {a: 1, b: 2}) $(x);
`````

## Normalized

`````js filename=intro
{
  const tmpForInPatDeclRhs = { a: 1, b: 2 };
  let tmpForInPatDeclLhs;
  let x;
  for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
    const tmpAssignObjPatternRhs = tmpForInPatDeclLhs;
    x = tmpAssignObjPatternRhs.x;
    $(x);
  }
}
`````

## Output

`````js filename=intro
{
  const tmpForInPatDeclRhs = { a: 1, b: 2 };
  let tmpForInPatDeclLhs;
  for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
    const tmpAssignObjPatternRhs = tmpForInPatDeclLhs;
    const x = tmpAssignObjPatternRhs.x;
    $(x);
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
