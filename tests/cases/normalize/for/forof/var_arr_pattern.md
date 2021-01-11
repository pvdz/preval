# Preval test case

# simple_complex.md

> normalize > for > forin > simple_complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
for (let {x} of {a: 1, b: 2}) $(x);
`````

## Normalized

`````js filename=intro
{
  let tmpForOfLhsDecl;
  {
    const tmpForOfRhs = { a: 1, b: 2 };
    for (tmpForOfLhsDecl of tmpForOfRhs) {
      let bindingPatternObjRoot = tmpForOfLhsDecl;
      let x = bindingPatternObjRoot.x;
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
    for (x of x) {
      var x = x;
      var x = x.x;
      x(x);
    }
  }
}
`````

## Output

`````js filename=intro
let tmpForOfLhsDecl;
const tmpForOfRhs = { a: 1, b: 2 };
for (tmpForOfLhsDecl of tmpForOfRhs) {
  let bindingPatternObjRoot = tmpForOfLhsDecl;
  let x = bindingPatternObjRoot.x;
  $(x);
}
`````
