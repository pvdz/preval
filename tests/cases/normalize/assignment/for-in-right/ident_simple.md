# Preval test case

# ident_simple.md

> normalize > assignment > for-in-right > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let x in (a = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  let tmpForInLhsDecl;
  {
    a = b;
    const tmpForInRhs = b;
    for (tmpForInLhsDecl in tmpForInRhs) {
      let x = tmpForInLhsDecl;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let tmpForInLhsDecl;
a = 2;
for (tmpForInLhsDecl in 2) {
}
$(a, 2, 3);
`````
