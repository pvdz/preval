# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > for-a > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for (let a = b.x = c;false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
{
  let a;
  const tmpNestedPropAssignRhs = c;
  b.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  while (false) {
    $(a, b, c);
  }
}
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
let a;
b.x = 3;
a = 3;
while (false) {
  $(a, b, 3);
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: ("<crash[ Identifier 'a' has already been declared ]>")
