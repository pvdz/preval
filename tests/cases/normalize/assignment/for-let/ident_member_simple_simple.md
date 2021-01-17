# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > for-let > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for (let wat = a = b.x = c; false;);
$(wat);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
{
  b.x = c;
  a = c;
  let wat_1 = a;
  while (false) {}
}
$(wat_1);
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
b.x = 3;
a = 3;
let wat_1 = a;
while (false) {}
$(wat_1);
$(a, b, 3);
`````
