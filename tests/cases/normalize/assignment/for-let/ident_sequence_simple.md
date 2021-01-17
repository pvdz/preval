# Preval test case

# ident_sequence_simple.md

> normalize > assignment > for-let > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let wat = a = ($(b), c); false;);
$(wat);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  $(b);
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
$(2);
a = 3;
let wat_1 = a;
while (false) {}
$(wat_1);
$(a, 2, 3);
`````
