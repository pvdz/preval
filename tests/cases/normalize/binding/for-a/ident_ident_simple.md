# Preval test case

# ident_ident_simple.md

> normalize > assignment > for-a > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let a = b = c;false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  let a_1;
  b = c;
  a_1 = c;
  while (false) {
    $(a_1, b, c);
  }
}
`````

## Output

`````js filename=intro
let b = 2;
let a_1;
b = 3;
a_1 = 3;
while (false) {
  $(a_1, b, 3);
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
