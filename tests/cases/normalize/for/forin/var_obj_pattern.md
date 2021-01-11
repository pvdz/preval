# Preval test case

# simple_complex.md

> normalize > for > forin > simple_complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
for (let [x] in {a: 1, b: 2}) $(x);
`````

## Normalized

`````js filename=intro
{
  let tmpForInLhsDecl;
  {
    const tmpForInRhs = { a: 1, b: 2 };
    for (tmpForInLhsDecl in tmpForInRhs) {
      let bindingPatternArrRoot = tmpForInLhsDecl;
      let arrPatternSplat = [...bindingPatternArrRoot];
      let x = arrPatternSplat[0];
      $(x);
    }
  }
}
`````

## Uniformed

`````js filename=intro
{
  var x;
  {
    var x = { x: 8, x: 8 };
    for (x in x) {
      var x = x;
      var x = [...x];
      var x = x[8];
      x(x);
    }
  }
}
`````

## Output

`````js filename=intro
let tmpForInLhsDecl;
const tmpForInRhs = { a: 1, b: 2 };
for (tmpForInLhsDecl in tmpForInRhs) {
  let bindingPatternArrRoot = tmpForInLhsDecl;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let x = arrPatternSplat[0];
  $(x);
}
`````
