# Preval test case

# ident_sequence_complex.md

> normalize > assignment > let > ident_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let wat = a = ($(b), $(c));
$(wat);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
$(b);
a = $(c);
let wat = a;
$(wat);
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
$(2);
a = $(3);
let wat = a;
$(wat);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[2], [3], [null], [null, 2, 3], null];

Normalized calls: Same

Final output calls: Same
