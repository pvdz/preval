# Preval test case

# ident_sequence_complex.md

> normalize > assignment > for-a > ident_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (a = ($(b), $(c));;);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  $(b);
  a = $(c);
  while (true) {}
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
$(2);
a = $(3);
while (true) {}
$(a, 2, 3);
`````
