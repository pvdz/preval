# Preval test case

# ident_ident_bin.md

> normalize > assignment > for-in-right > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
for (let x in (a = b = c + d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
{
  let tmpForInLhsDecl;
  {
    tmpNestedComplexRhs = c + d;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
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
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let tmpForInLhsDecl;
tmpNestedComplexRhs = 7;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
const tmpForInRhs = a;
for (tmpForInLhsDecl in tmpForInRhs) {
}
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: 7,7,3
 - 1: undefined

Normalized calls: Same

Final output calls: BAD!!
[[7, 7, 7], null];
