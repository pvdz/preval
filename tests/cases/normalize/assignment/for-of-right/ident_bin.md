# Preval test case

# ident_bin.md

> normalize > assignment > for-of-right > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let x of (a = b + c));
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
    a = b + c;
    const tmpForOfRhs = a;
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
a = 5;
const tmpForOfRhs = a;
for (tmpForOfLhsDecl of tmpForOfRhs) {
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
