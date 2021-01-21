# Preval test case

# ident_simple.md

> normalize > assignment > for-of-right > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let x of (a = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  let tmpForOfLhsDecl;
  {
    a = b;
    const tmpForOfRhs = b;
    for (tmpForOfLhsDecl of tmpForOfRhs) {
      let x = tmpForOfLhsDecl;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let tmpForOfLhsDecl;
a = 2;
for (tmpForOfLhsDecl of 2) {
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
