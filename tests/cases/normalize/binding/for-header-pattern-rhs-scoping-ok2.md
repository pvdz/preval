# Preval test case

# for-header-rhs-scoping.md

> normalize > binding > for-header-rhs-scoping
>
> The RHS of a for-of and for-in are scoped to the special for-header scope, not the scope that wraps the statement. As such, the `x` is tdz'd and it the `[x,y]` part should result in a runtime tdz error over accessing `x`.

#TODO

## Input

`````js filename=intro
let y = {};
for (let [x] in [y]) {
  $(x);
}
`````

## Normalized

`````js filename=intro
let y = {};
{
  const tmpForInPatDeclRhs = [y];
  let tmpForInPatDeclLhs;
  let x;
  for (tmpForInPatDeclLhs in tmpForInPatDeclRhs) {
    const arrAssignPatternRhs = tmpForInPatDeclLhs;
    const arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    {
      $(x);
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
 - 1: '0'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
