# Preval test case

# ident_ident_simple.md

> normalize > assignment > for-of-right > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let x of (a = b = c));
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
    b = c;
    a = c;
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
let b = 2;
let tmpForOfLhsDecl;
b = 3;
a = 3;
const tmpForOfRhs = a;
for (tmpForOfLhsDecl of tmpForOfRhs) {
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
