# Preval test case

# ident_ident_bin.md

> normalize > assignment > for-c > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
for (;;a = b = c + d);
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
  while (true) {
    tmpNestedComplexRhs = c + d;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
while (true) {
  tmpNestedComplexRhs = 7;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
}
$(a, b, 7);
`````
