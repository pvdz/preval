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
  let tmpForInLhsDecl;
  {
    const tmpForInRhs = { a: 1, b: 2 };
    for (tmpForInLhsDecl in tmpForInRhs) {
      let bindingPatternObjRoot = tmpForInLhsDecl;
      let x = bindingPatternObjRoot.x;
      $(x);
    }
  }
}
`````

## Output

`````js filename=intro
let tmpForInLhsDecl;
const tmpForInRhs = { a: 1, b: 2 };
for (tmpForInLhsDecl in tmpForInRhs) {
  let bindingPatternObjRoot = tmpForInLhsDecl;
  let x = bindingPatternObjRoot.x;
  $(x);
}
`````

## Result

Should call `$` with:
[[null], [null], null];

Normalized calls: Same

Final output calls: Same
