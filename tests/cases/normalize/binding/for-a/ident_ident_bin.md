# Preval test case

# ident_ident_bin.md

> normalize > assignment > for-a > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
for (let a = b = c + d;false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
{
  let a;
  const tmpNestedComplexRhs = c + d;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  while (false) {
    $(a, b, c);
  }
}
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
let a;
b = 7;
a = 7;
while (false) {
  $(a, b, 7);
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: ("<crash[ Identifier 'a' has already been declared ]>")
