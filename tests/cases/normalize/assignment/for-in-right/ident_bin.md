# Preval test case

# ident_bin.md

> normalize > assignment > for-in-right > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let x in (a = b + c));
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
    a = b + c;
    const tmpForInRhs = a;
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
a = 5;
const tmpForInRhs = a;
for (tmpForInLhsDecl in tmpForInRhs) {
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
[[5, 2, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[[5, 5, 3], null];

